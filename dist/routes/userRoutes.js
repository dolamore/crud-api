import { addUser, users } from '../models/user';
import { parse } from 'url';
export const userRoutes = (req, res) => {
    const { pathname } = parse(req.url, true);
    // Получение всех пользователей
    if (req.method === 'GET' && pathname === '/api/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    }
    // Добавление нового пользователя
    else if (req.method === 'POST' && pathname === '/api/users') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { username, age, hobbies } = JSON.parse(body);
            const newUser = addUser(username, age, hobbies);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        });
    }
    // Другие маршруты...
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
};
