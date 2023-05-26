"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const verifyToken_1 = require("../utils/verifyToken");
const roomRoutes = (0, express_1.Router)();
const { roomController } = controllers_1.default;
roomRoutes.post('/:hotelId', verifyToken_1.verifyAdmin, roomController.createRoom);
roomRoutes.get('/:id', roomController.readRoom);
roomRoutes.get('/', roomController.getRooms);
roomRoutes.put('/availability/:id', roomController.updateRoomAvailability);
roomRoutes.put('/:id', verifyToken_1.verifyAdmin, roomController.updateRoom);
roomRoutes.delete('/:id/:hotelId', verifyToken_1.verifyAdmin, roomController.deleteRoomHotel);
exports.default = roomRoutes;
