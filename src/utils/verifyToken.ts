import jwt from 'jsonwebtoken';
import { createError } from './error';
import { NextFunction, Request, Response } from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction, cb: NextFunction) => {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const { authorization } = req.headers;

    // Check if the authorization header exists
    if (!authorization) {
        return res.status(401).send({ error: 'No authorization header' });
    }
    //No correct scheme(Bearer)
    if (!authorization.startsWith("Bearer")) {
        return res.status(401).send({ error: 'Bearer schema expected' });
    }
    //Check if the token is valid
    const splittedtoken = authorization.split("Bearer ");
    if (splittedtoken.length !== 2) {
        return res.status(401).send({ error: 'Invalid token' });
    }

    const token = splittedtoken[1];
    if (!token) return next(createError(401, "You are note authenticated!"));

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        res.locals = {
            ...res.locals,
            user
        }
        next();
    })
}

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {

    verifyToken(req, res, next, () => {
        if (res.locals.user.id === Number.parseInt(req.params.id) || res.locals.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "You are note authorized!"));
        }
    })
}

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next, () => {
        if (res.locals.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "You are note authorized!"));
        }
    })
}