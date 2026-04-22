import { type Request, type Response } from 'express';
import { SurpriseModel } from '../models/SurpriseModel.js';

export class SurpriseController {
    static async getSurpriseByDay(req: Request, res: Response) {
        try {
            const day = parseInt(req.params.day as string);
            const now = new Date();
            const today = now.getDate();

            const isFutureDay = day > today;

            if (isFutureDay) {
                return res.status(403).json({ 
                    message: `Patience Michel ! Nous sommes le ${today}, tu ne peux pas encore ouvrir la case ${day}.` 
                });
            }

            const surprise = await SurpriseModel.findOne({ day });
            
            if (!surprise) {
                return res.status(404).json({ message: "Case vide..." });
            }

            console.log("✅ Accès autorisé");
            return res.json(surprise);

        } catch (error) {
            console.error("Erreur contrôleur surprise:", error);
            return res.status(500).json({ message: "Erreur serveur" });
        }
    }
}