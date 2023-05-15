"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hotel_controller_1 = __importDefault(require("./hotel.controller"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const user_controller_1 = __importDefault(require("./user.controller"));
const room_controller_1 = __importDefault(require("./room.controller"));
exports.default = {
    hotelController: hotel_controller_1.default,
    authController: auth_controller_1.default,
    userController: user_controller_1.default,
    roomController: room_controller_1.default,
};
