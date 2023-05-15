import { NextFunction, Request, Response, Router } from 'express';
import controllers from '../controllers';
import { verifyAdmin, verifyUser } from '../utils/verifyToken';

const userRoutes = Router();
const { userController } = controllers;

userRoutes.get('/:id', verifyUser, userController.readUser)
userRoutes.get('/', verifyAdmin, userController.getUsers)
userRoutes.put('/:id', verifyUser, userController.updateUser)
userRoutes.delete('/:id', verifyUser, userController.deleteUser)

export default userRoutes;