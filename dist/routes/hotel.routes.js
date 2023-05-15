"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const verifyToken_1 = require("../utils/verifyToken");
const hotelRoutes = (0, express_1.Router)();
const { hotelController } = controllers_1.default;
hotelRoutes.post('/', verifyToken_1.verifyAdmin, hotelController.createHotel);
hotelRoutes.get('/', hotelController.getHotels);
hotelRoutes.get('/countByCity', hotelController.countByCity);
hotelRoutes.get('/countByType', hotelController.countByType);
hotelRoutes.get('/:id', hotelController.readHotel);
hotelRoutes.put('/:id', verifyToken_1.verifyAdmin, hotelController.updateHotel);
hotelRoutes.delete('/:id', verifyToken_1.verifyAdmin, hotelController.deleteHotel);
// hotelRoutes.get('/countByType',hotelController.);
exports.default = hotelRoutes;
