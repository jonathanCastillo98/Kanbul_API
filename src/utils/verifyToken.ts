import jwt from 'jsonwebtoken';
import { createError } from './error';
import { NextFunction, Request, Response, request } from 'express';

export const verifyToken = (req:Request, res:Response, next: NextFunction, cb: NextFunction) => {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const token = req.cookies.access_token;
    if(!token) return next(createError(401, "You are note authenticated!"));

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    })
}

export const verifyUser = (req:Request, res:Response, next: NextFunction) => {
    verifyToken(req, res, next, () => {
        if(req.user.id === Number.parseInt(req.params.id) || req.user.isAdmin){
            next()
        }else{
            return next(createError(403, "You are note authorized!"));
        }
    })
}

export const verifyAdmin = (req:Request, res:Response, next: NextFunction) => {
    verifyToken(req, res, next, () => {
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403, "You are note authorized!"));
        }
    })
}