import { SurpriseModel } from './models/SurpriseModel.js';

export const seedSurprises = async () => {
    const count = await SurpriseModel.countDocuments();
    
    if (count === 0) {
        console.log("🌱 Base MongoDB vide, génération des surprises...");
        
        const surprises = [];
        for (let i = 1; i <= 24; i++) {
            surprises.push({
                day: i,
                type: i % 2 === 0 ? 'image' : 'text', 
                title: `Jour ${i}`,
                content: i % 2 === 0 
                    ? `https://picsum.photos/seed/avent${i}/400/300`
                    : `C'est le jour ${i}, Michel ! Plus que ${24 - i} dodos.`
            });
        }

        await SurpriseModel.insertMany(surprises);
        console.log("✅ 24 surprises créées dans MongoDB !");
    } else {
        console.log("ℹ️ MongoDB contient déjà des données, skip du seeding.");
    }
};