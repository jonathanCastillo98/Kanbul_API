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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = void 0;
const user_model_1 = require("../models/user.model");
const error_1 = require("../utils/error");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;
const createAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield user_model_1.User.findOne({
            where: {
                username: ADMIN_USERNAME,
                email: ADMIN_EMAIL
            }
        });
        if (user) {
            console.log("The user already exists");
        }
        else {
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hash = bcryptjs_1.default.hashSync(ADMIN_PASSWORD, salt);
            const admin = user_model_1.User.create({
                username: ADMIN_USERNAME,
                email: ADMIN_EMAIL,
                password: hash,
                isAdmin: true
            });
            return admin;
        }
    }
    catch (error) {
        (0, error_1.createError)(500, "Something went wrong!");
    }
});
const initDb = () => {
    createAdmin();
};
exports.initDb = initDb;
