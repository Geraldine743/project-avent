import express from 'express';
import cors from 'cors';
import pool from './db.js'; // Notez le .js à la fin pour que Node.js le trouve bien !

const app = express();
app.use(cors()); // Autorise le Frontend (Vue.js) à parler au Backend (Node.js)

const PORT = 3000;

// Notre première route de test pour voir les calendriers
app.get('/api/admin/calendars', async (req, res) => {
    try {
        // Le Pool prête une connexion automatiquement, lance la requête, puis la récupère
        const [rows] = await pool.query('SELECT * FROM calendars ORDER BY created_at DESC');
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error("Erreur de base de données :", error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

app.get('/', (req, res) => {
    res.send("L'API du calendrier de Michel est en ligne !");
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});