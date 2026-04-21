import  express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("L'API du calendrier de Michel est en ligne !");
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});