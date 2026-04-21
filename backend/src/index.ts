import express from 'express';
import cors from 'cors';
import { AuthController } from './controllers/AuthController.js';
import { connectMongoDB } from './mongodb.js';
import { seedSurprises } from './seed.js';
import { SurpriseModel } from './models/SurpriseModel.js';

const app = express();
connectMongoDB().then(() => {
    seedSurprises();
});
app.use(express.json());
app.use(cors());


const PORT = 3000;

app.post('/api/auth/register', AuthController.register);
app.post('/api/auth/login', AuthController.login);

app.get('/', (req, res) => {
    res.send("L'API du calendrier de Michel est en ligne !");
});

app.get('/api/surprises/:day', async (req, res) => {
    try {
        const day = req.params.day;
        const surprise = await SurpriseModel.findOne({ day: parseInt(day) });
        
        if (!surprise) {
            return res.status(404).json({ message: "Jour non trouvé" });
        }
        
        res.json(surprise);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur le port ${PORT}`);
    console.log(`👉 Test Register : POST http://localhost:${PORT}/api/auth/register`);
    console.log(`👉 Test Login    : POST http://localhost:${PORT}/api/auth/login`);
});