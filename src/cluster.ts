import cluster from 'cluster';
import os from 'os';
import { handleRequest as userRoutes } from './routes/userRoutes';
import { createServer as httpCreateServer } from 'http';
import { createServer as proxyCreateServer, request as proxyRequest } from 'http';

const numCPUs = os.cpus().length;
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs - 1; i++) {
        cluster.fork();
    }

    let currentWorker = 0;

    const loadBalancer = proxyCreateServer((req, res) => {
        const workerPort = PORT + 1 + (currentWorker % (numCPUs - 1));
        currentWorker++;

        const options = {
            hostname: 'localhost',
            port: workerPort,
            path: req.url,
            method: req.method,
            headers: req.headers,
        };

        const proxy = proxyRequest(options, (proxyRes) => {
            res.writeHead(proxyRes.statusCode!, proxyRes.headers);
            proxyRes.pipe(res, { end: true });
        });

        req.pipe(proxy, { end: true });
    });

    loadBalancer.listen(PORT, () => {
        console.log(`Load balancer listening on port ${PORT}`);
    });

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });

} else {
    const server = httpCreateServer(userRoutes);

    server.listen(PORT + cluster.worker!.id, () => {
        console.log(`Worker ${process.pid} is listening on port ${PORT + cluster.worker!.id}`);
    });
}
