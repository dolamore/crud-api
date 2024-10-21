import { createServer } from 'http';
import { userRoutes } from './routes/userRoutes.js';
const server = createServer(userRoutes);
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
