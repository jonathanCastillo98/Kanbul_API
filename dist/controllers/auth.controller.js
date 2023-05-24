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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../utils/error");
const user_model_1 = require("../models/user.model");
const JWT_SECRET = process.env.JWT_SECRET;
const authController = {
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { password } = req.body;
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hash = bcryptjs_1.default.hashSync(password, salt);
            const newUser = yield user_model_1.User.create(Object.assign(Object.assign({}, req.body), { password: hash }));
            yield newUser.save();
            res.status(200).json("User has been created.");
        }
        catch (error) {
            next(error);
        }
    }),
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.User.findOne({
                attributes: ["id", "username", "email", "country", "img", "city", "phone", "role", "isAdmin", "password"],
                where: {
                    username: req.body.username
                }
            });
            if (!user)
                return next((0, error_1.createError)(404, "User not found."));
            const isPasswordCorrect = yield bcryptjs_1.default.compare(req.body.password, user.password);
            if (!isPasswordCorrect)
                return next((0, error_1.createError)(400, "Wrong password or username!"));
            const token = jsonwebtoken_1.default.sign({ id: user.id, isAdmin: user.isAdmin, email: user.email }, JWT_SECRET);
            const _a = user.dataValues, { password, isAdmin } = _a, otherDeatils = __rest(_a, ["password", "isAdmin"]);
            res.status(200).json(Object.assign(Object.assign({}, otherDeatils), { token }));
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = authController;
