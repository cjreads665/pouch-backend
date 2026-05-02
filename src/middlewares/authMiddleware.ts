import type {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sample_jwt_secret';


export interface AuthRequest extends Request {
    user? : {userId: number}
}

export function authenticateToken(req: AuthRequest, res:Response, next:NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]; // ""Bearer token. so we split by space and take the second part which is the token itself. leaving the first part which is "Bearer" since it's just a prefix.
    if(!token) return res.status(401).json({message: "Access denied. No token provided."});

    try{
        /**
         * Type Casting. You are telling the computer: "I am 100% sure that when you open this token, you're going to find an object with a userId that is a number."
         */
        const decoded = jwt.verify(token, JWT_SECRET) as {userId: number}; // the claim is passed to the verify method inside the token itself. The signature is inside the token as well. So when we verify, it checks the signature and if it's valid, it gives us the claim which is the userId in this case.
        req.user = decoded; // we attach the decoded user object to the request object so that it can be accessed in the next middleware or route handler.
        next();
    } catch(error){
        return res.status(403).json({error: "Invalid token. Access denied."})
    }
}