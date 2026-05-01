import { type Request, type Response } from 'express';
import { UserModel } from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: "Mot de passe ou identifiant incorrect" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Mot de passe ou identifiant incorrect" });
            }
            const secret = process.env.JWT_SECRET || 'mon_secret_ultra_sur';
            const token = jwt.sign(
                { id: user.id, email: user.email }, 
                secret, 
                { expiresIn: '24h' }
            );
            res.json({
                success: true,
                token,
                user: { name: user.name, email: user.email }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la connexion" });
        }
    }
}