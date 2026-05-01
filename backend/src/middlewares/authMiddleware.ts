import jwt from 'jsonwebtoken';
import { type Request, type Response, type NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = typeof authHeader === 'string' ? authHeader.split(' ')[1] : undefined;

    if (!token) {
        return res.status(403).json({ message: "Badge d'accès manquant !" });
    }

    try {
        const secret = process.env.JWT_SECRET || 'ma_clé_secrète_par_défaut';
        const decoded = jwt.verify(token, secret);
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Badge invalide ou expiré" });
    }
}