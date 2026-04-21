import express from 'express';
import cors from 'cors';
import { AuthController } from './controllers/AuthController.js';

const app = express();
app.use(express.json());
app.use(cors()); 

const PORT = 3000;

app.post('/api/auth/register', AuthController.register);

app.get('/', (req, res) => {
    res.send("L'API du calendrier de Michel est en ligne !");
});


app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});