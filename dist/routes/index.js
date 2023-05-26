"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotel_routes_1 = __importDefault(require("./hotel.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const room_routes_1 = __importDefault(require("./room.routes"));
const router = (0, express_1.Router)();
router.use('/hotels', hotel_routes_1.default);
router.use('/auth', auth_routes_1.default);
router.use('/users', user_routes_1.default);
router.use('/rooms', room_routes_1.default);
router.use((err, req, res, next) => {
    const errorStatus = 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});
exports.default = router;
