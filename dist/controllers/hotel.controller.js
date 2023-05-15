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
Object.defineProperty(exports, "__esModule", { value: true });
const hotel_model_1 = require("../models/hotel.model");
const error_1 = require("../utils/error");
const sequelize_1 = require("sequelize");
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
            const _a = req.query, { min, max, limit } = _a, others = __rest(_a, ["min", "max", "limit"]);
            const hotels = yield hotel_model_1.Hotel.findAll({
                where: Object.assign(Object.assign({}, others), { cheapestPrice: {
                        [sequelize_1.Op.between]: [Number(min) || 1, Number(max) || 41]
                    } }),
                limit: Number(req.query.limit) || 10
            });
            if (hotels.length === 0)
                return next((0, error_1.createError)(404, "No searches with this feature!"));
            res.status(200).json(hotels);
        }
        catch (error) {
            next(error);
        }
    }),
    countByCity: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cities = req.query.cities;
            let citiesArr = [];
            if (typeof cities === "string")
                citiesArr = cities.split(",");
            const list = yield Promise.all(citiesArr.map((city) => __awaiter(void 0, void 0, void 0, function* () {
                const hotel = hotel_model_1.Hotel.findAndCountAll({
                    where: {
                        city: city
                    }
                });
                return hotel;
            })));
            res.status(200).json(list);
        }
        catch (error) {
            next(error);
        }
    }),
    countByType: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hotelCount = yield hotel_model_1.Hotel.findAndCountAll({ where: { type: "hotel" } });
            const apartmentCount = yield hotel_model_1.Hotel.findAndCountAll({ where: { type: "apartment" } });
            const resortCount = yield hotel_model_1.Hotel.findAndCountAll({ where: { type: "resort" } });
            const villaCount = yield hotel_model_1.Hotel.findAndCountAll({ where: { type: "villa" } });
            const cabinCount = yield hotel_model_1.Hotel.findAndCountAll({ where: { type: "cabin" } });
            res.status(200).json([
                { type: "hotel", count: hotelCount.count, hotels: hotelCount.rows },
                { type: "apartment", count: apartmentCount.count, hotels: apartmentCount.rows },
                { type: "resort", count: resortCount.count, hotels: resortCount.rows },
                { type: "villa", count: villaCount.count, hotels: villaCount.rows },
                { type: "cabin", count: cabinCount.count, hotels: cabinCount.rows },
            ]);
        }
        catch (error) {
            next(error);
        }
    })
};
exports.default = hotelController;
