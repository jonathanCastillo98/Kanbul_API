import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { createError } from "../utils/error";

const userController = {
    updateUser:async (req:Request, res: Response, next: NextFunction) => {
        try {

            const {id} = req.params;
            const user = await User.findByPk(id);

            if(!user) return next(createError(404, "User not found!"));

            await user.update(req.body);
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    },
    deleteUser:async (req:Request, res: Response, next: NextFunction) => {
        try {

            const {id} = req.params;
            const user = await User.findByPk(id);

            if(!user) return next(createError(404, "User not found!"));

            await user.destroy();
            res.status(200).json("User deleted successfully!")
        } catch (error) {
            next(error)
        }
    },
    readUser:async (req:Request, res: Response, next: NextFunction) => {
        try {

            const {id} = req.params;
            const user = await User.findByPk(id);

            if(!User) return next(createError(404, "User not found!"));

            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    },
    getUsers:async (req:Request, res: Response, next: NextFunction) => {
        try {

            const users = await User.findAll();

            if(users.length === 0) return next(createError(404, "User list is empty!"));

            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }
}

export default userController;