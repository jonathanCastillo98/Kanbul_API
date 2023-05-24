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
const room_model_1 = require("../models/room.model");
const hotel_model_1 = require("../models/hotel.model");
const error_1 = require("../utils/error");
const uuid_1 = require("uuid");
const roomController = {
    createRoom: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hotelId = req.params.hotelId;
            const newRoom = yield room_model_1.Room.create(req.body);
            const newRoomUpdated = newRoom.roomNumbers.map(i => {
                i.roomId = (0, uuid_1.v4)();
                i.unavailableDates = [];
                return i;
            });
            yield room_model_1.Room.update({
                roomNumbers: newRoomUpdated
            }, {
                where: {
                    id: newRoom.id
                }
            });
            try {
                const hotel = yield hotel_model_1.Hotel.findByPk(hotelId);
                if (!hotel)
                    return next((0, error_1.createError)(404, "Hotel not found!"));
                const roomsArr = hotel.rooms;
                roomsArr.push(newRoom.id);
                yield hotel_model_1.Hotel.update({
                    rooms: roomsArr
                }, {
                    where: {
                        id: hotelId
                    }
                });
            }
            catch (error) {
                next(error);
            }
            return res.status(200).json(newRoom);
        }
        catch (error) {
            next(error);
        }
    }),
    updateRoom: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const room = yield room_model_1.Room.findByPk(id);
            if (!room)
                return next((0, error_1.createError)(404, "Room not found!"));
            yield room.update(req.body);
            res.status(200).json(room);
        }
        catch (error) {
            next(error);
        }
    }),
    deleteRoom: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, hotelId } = req.params;
            const room = yield room_model_1.Room.findByPk(id);
            if (!room)
                return next((0, error_1.createError)(404, "Room not found!"));
            yield room.destroy();
            try {
                const hotel = yield hotel_model_1.Hotel.findByPk(hotelId);
                if (!hotel)
                    return next((0, error_1.createError)(404, "Hotel not found!"));
                const roomsArr = hotel.rooms;
                const index = roomsArr.indexOf(room.id);
                roomsArr.splice(index, 1);
                yield hotel_model_1.Hotel.update({
                    rooms: roomsArr
                }, {
                    where: {
                        id: hotelId
                    }
                });
            }
            catch (error) {
                next(error);
            }
            res.status(200).json("Room deleted successfully!");
        }
        catch (error) {
            next(error);
        }
    }),
    readRoom: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const room = yield room_model_1.Room.findByPk(id);
            if (!room)
                return next((0, error_1.createError)(404, "Room not found!"));
            res.status(200).json(room);
        }
        catch (error) {
            next(error);
        }
    }),
    getRooms: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const rooms = yield room_model_1.Room.findAll();
            if (rooms.length === 0)
                return next((0, error_1.createError)(404, "Room list is empty!"));
            res.status(200).json(rooms);
        }
        catch (error) {
            next(error);
        }
    }),
    updateRoomAvailability: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { dates } = req.body;
            const rooms = yield room_model_1.Room.findAll();
            const roomFound = rooms.find(i => i.roomNumbers.find(j => j.roomId == id));
            const newRoomUpdated = roomFound === null || roomFound === void 0 ? void 0 : roomFound.roomNumbers.map(i => {
                if (i.roomId === id)
                    i.unavailableDates = [...i.unavailableDates, ...dates];
                return i;
            });
            yield room_model_1.Room.update({
                roomNumbers: newRoomUpdated
            }, {
                where: {
                    id: roomFound === null || roomFound === void 0 ? void 0 : roomFound.id
                }
            });
            return res.status(200).json(roomFound);
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = roomController;
