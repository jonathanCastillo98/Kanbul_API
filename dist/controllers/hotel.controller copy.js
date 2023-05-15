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
const hotel_model_1 = require("../models/hotel.model");
const error_1 = require("../utils/error");
const hotelController = {
    createHotel: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hotel = yield hotel_model_1.Hotel.create(req.body);
            res.status(200).json(hotel);
        }
        catch (error) {
            next(error);
        }
    }),
    updateHotel: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const hotel = yield hotel_model_1.Hotel.findByPk(id);
            if (!hotel)
                return next((0, error_1.createError)(404, "Hotel not found!"));
            yield hotel.update(req.body);
            res.status(200).json(hotel);
        }
        catch (error) {
            next(error);
        }
    }),
    deleteHotel: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const hotel = yield hotel_model_1.Hotel.findByPk(id);
            if (!hotel)
                return next((0, error_1.createError)(404, "Hotel not found!"));
            yield hotel.destroy();
            res.status(200).json("Hotel deleted successfully!");
        }
        catch (error) {
            next(error);
        }
    }),
    readHotel: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const hotel = yield hotel_model_1.Hotel.findByPk(id);
            if (!hotel)
                return next((0, error_1.createError)(404, "Hotel not found!"));
            res.status(200).json(hotel);
        }
        catch (error) {
            next(error);
        }
    }),
    getHotels: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hotels = yield hotel_model_1.Hotel.findAll();
            if (hotels.length === 0)
                return next((0, error_1.createError)(404, "Hotel list is empty!"));
            res.status(200).json(hotels);
        }
        catch (error) {
            next(error);
        }
    })
};
exports.default = hotelController;
