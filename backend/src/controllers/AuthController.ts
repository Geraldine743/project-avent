import { type Request, type Response } from 'express';
import { UserModel } from '../models/UserModel.js';
import bcrypt from 'bcrypt';

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: "Champs manquants" });
            }

            const existingUser = await UserModel.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "Cet email est déjà utilisé" });
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            await UserModel.create(name, email, hashedPassword);

            res.status(201).json({ success: true, message: "Utilisateur créé en toute sécurité !" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de l'inscription" });
        }
    }
}