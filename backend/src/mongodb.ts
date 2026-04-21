import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://avent_mongo:27017/avent_db';

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connecté à MongoDB avec succès");
    } catch (error) {
        console.error("❌ Erreur de connexion MongoDB:", error);
    }
};