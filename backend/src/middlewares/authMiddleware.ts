import jwt from 'jsonwebtoken';
import { type Request, type Response, type NextFunction } from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "Badge d'accès manquant !" });
    }

    try {
        const secret = process.env.JWT_SECRET || 'mon_secret_ultra_sur';
        const decoded = jwt.verify(token, secret);
        
        (req as any).user = decoded;
        
        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Badge invalide ou expiré" });
    }
};