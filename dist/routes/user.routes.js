"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const verifyToken_1 = require("../utils/verifyToken");
const userRoutes = (0, express_1.Router)();
const { userController } = controllers_1.default;
userRoutes.get('/:id', verifyToken_1.verifyUser, userController.readUser);
userRoutes.get('/', verifyToken_1.verifyAdmin, userController.getUsers);
userRoutes.put('/:id', verifyToken_1.verifyUser, userController.updateUser);
userRoutes.delete('/:id', verifyToken_1.verifyUser, userController.deleteUser);
exports.default = userRoutes;
