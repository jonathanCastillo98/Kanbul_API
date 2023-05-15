"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const error_1 = require("../utils/error");
const userController = {
    updateUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield user_model_1.User.findByPk(id);
            if (!user)
                return next((0, error_1.createError)(404, "User not found!"));
            yield user.update(req.body);
            res.status(200).json(user);
        }
        catch (error) {
            next(error);
        }
    }),
    deleteUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield user_model_1.User.findByPk(id);
            if (!user)
                return next((0, error_1.createError)(404, "User not found!"));
            yield user.destroy();
            res.status(200).json("User deleted successfully!");
        }
        catch (error) {
            next(error);
        }
    }),
    readUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield user_model_1.User.findByPk(id);
            if (!user_model_1.User)
                return next((0, error_1.createError)(404, "User not found!"));
            res.status(200).json(user);
        }
        catch (error) {
            next(error);
        }
    }),
    getUsers: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield user_model_1.User.findAll();
            if (users.length === 0)
                return next((0, error_1.createError)(404, "User list is empty!"));
            res.status(200).json(users);
        }
        catch (error) {
            next(error);
        }
    })
};
exports.default = userController;
