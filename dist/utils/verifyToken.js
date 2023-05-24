"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyUser = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("./error");
const verifyToken = (req, res, next, cb) => {
    const JWT_SECRET = process.env.JWT_SECRET;
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
    if (!token)
        return next((0, error_1.createError)(401, "You are note authenticated!"));
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
        if (err)
            return next((0, error_1.createError)(403, "Token is not valid!"));
        req.user = user;
        next();
    });
};
exports.verifyToken = verifyToken;
const verifyUser = (req, res, next) => {
    (0, exports.verifyToken)(req, res, next, () => {
        if (req.user.id === Number.parseInt(req.params.id) || req.user.isAdmin) {
            next();
        }
        else {
            return next((0, error_1.createError)(403, "You are note authorized!"));
        }
    });
};
exports.verifyUser = verifyUser;
const verifyAdmin = (req, res, next) => {
    (0, exports.verifyToken)(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            return next((0, error_1.createError)(403, "You are note authorized!"));
        }
    });
};
exports.verifyAdmin = verifyAdmin;
