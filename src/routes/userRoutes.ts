import {IncomingMessage, ServerResponse} from 'http';
import {addUser, users, User} from '../models/user';
import {parse} from 'url';
import {validate as isValidUUID} from 'uuid';

export const handleRequest = (req: IncomingMessage, res: ServerResponse) => {
    const {pathname} = parse(req.url!, true);
    const pathParts = pathname?.split('/').filter(Boolean);
    try {
        if (req.method === 'GET' && pathname === '/api/users') {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(users));
        } else if (req.method === 'GET' && pathParts?.[0] === 'api' && pathParts?.[1] === 'users' && pathParts?.[2]) {
            const userId = pathParts[2];

            if (!isValidUUID(userId)) {
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({message: 'Invalid userId'}));
                return;
            }

            const user = users.find(u => u.id === userId);
            if (!user) {
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({message: 'User not found'}));
                return;
            }

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(user));
        } else if (req.method === 'POST' && pathname === '/api/users') {
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                try {
                    const {username, age, hobbies} = JSON.parse(body);

                    if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
                        res.writeHead(400, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({message: 'Invalid request body'}));
                        return;
                    }

                    const newUser = addUser(username, age, hobbies);
                    res.writeHead(201, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(newUser));
                } catch (error) {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({message: 'Invalid JSON format'}));
                }
            });
        } else if (req.method === 'PUT' && pathParts?.[0] === 'api' && pathParts?.[1] === 'users' && pathParts?.[2]) {
            const userId = pathParts[2];

            if (!isValidUUID(userId)) {
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({message: 'Invalid userId'}));
                return;
            }

            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                try {
                    const {username, age, hobbies} = JSON.parse(body);

                    const userIndex = users.findIndex(u => u.id === userId);

                    if (userIndex === -1) {
                        res.writeHead(404, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({message: 'User not found'}));
                        return;
                    }

                    const updatedUser: User = {id: userId, username, age, hobbies};
                    users[userIndex] = updatedUser;

                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(updatedUser));
                } catch (error) {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({message: 'Invalid JSON format'}));
                }
            });
        } else if (req.method === 'DELETE' && pathParts?.[0] === 'api' && pathParts?.[1] === 'users' && pathParts?.[2]) {
            const userId = pathParts[2];

            if (!isValidUUID(userId)) {
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({message: 'Invalid userId'}));
                return;
            }

            const userIndex = users.findIndex(u => u.id === userId);

            if (userIndex === -1) {
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({message: 'User not found'}));
                return;
            }

            users.splice(userIndex, 1);
            res.writeHead(204);
            res.end();
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404 Not Found');
        }
    } catch (error) {
        console.error('Server error:', error);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error: Something went wrong.');
    }
};