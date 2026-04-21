import express from 'express';
import cors from 'cors';
import { AuthController } from './controllers/AuthController.js';
import { connectMongoDB } from './mongodb.js';

const app = express();
app.use(express.json());
connectMongoDB();
app.use(cors()); 

const PORT = 3000;

app.post('/api/auth/register', AuthController.register);
app.post('/api/auth/login', AuthController.login);

app.get('/', (req, res) => {
    res.send("L'API du calendrier de Michel est en ligne !");
});


app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur le port ${PORT}`);
    console.log(`👉 Test Register : POST http://localhost:${PORT}/api/auth/register`);
    console.log(`👉 Test Login    : POST http://localhost:${PORT}/api/auth/login`);
});