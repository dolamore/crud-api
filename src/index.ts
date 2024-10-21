import { createServer as httpCreateServer, IncomingMessage, ServerResponse } from 'http';
import { handleRequest } from './routes/userRoutes';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = httpCreateServer((req: IncomingMessage, res: ServerResponse) => {
    handleRequest(req, res);
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});