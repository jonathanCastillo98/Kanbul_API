import { NextFunction, Request, Response } from "express";
import { Hotel } from "../models/hotel.model";
import { createError } from "../utils/error";
import { parse } from "path";
import { Op } from "sequelize";
import { Room } from "../models/room.model";

const hotelController = {
    createHotel:async (req:Request, res: Response, next: NextFunction) => {
        try {
            const hotel = await Hotel.create(req.body)
            res.status(200).json(hotel)
        } catch (error) {
            next(error)
        }
    },
    updateHotel:async (req:Request, res: Response, next: NextFunction) => {
        try {

            const {id} = req.params;
            const hotel = await Hotel.findByPk(id);

            if(!hotel) return next(createError(404, "Hotel not found!"));

            await hotel.update(req.body);
            res.status(200).json(hotel)
        } catch (error) {
            next(error)
        }
    },
    deleteHotel:async (req:Request, res: Response, next: NextFunction) => {
        try {

            const {id} = req.params;
            const hotel = await Hotel.findByPk(id);

            if(!hotel) return next(createError(404, "Hotel not found!"));

            await hotel.destroy();
            res.status(200).json("Hotel deleted successfully!")
        } catch (error) {
            next(error)
        }
    },
    readHotel:async (req:Request, res: Response, next: NextFunction) => {
        try {

            const {id} = req.params;
            const hotel = await Hotel.findByPk(id);

            if(!hotel) return next(createError(404, "Hotel not found!"));

            res.status(200).json(hotel)
        } catch (error) {
            next(error)
        }
    },
    getHotels:async (req:Request, res: Response, next: NextFunction) => {
        try {
           const {min,max, limit, ...others} = req.query;
           let hotels:Hotel[];
           
           if(Object.entries(req.query).length === 0){
            hotels= await Hotel.findAll({
                limit: Number(req.query.limit) || 10
            });
           }else{
            hotels= await Hotel.findAll({
                where:{
                    ...others,
                    cheapestPrice:{
                        [Op.between]: [Number(min) || 1, Number(max) || 41]
                    }
                },
                limit: Number(req.query.limit) || 10
            });
           }

           
           


            if(hotels.length === 0) return next(createError(404, "No searches with this feature!"));

            res.status(200).json(hotels)
        } catch (error) {
            next(error)
        }
    },
    countByCity:async (req:Request, res: Response, next: NextFunction) => {
        try {
            const cities = req.query.cities;
            let citiesArr:string[] = [];
            if(typeof cities === "string") citiesArr = cities.split(",");         
            
               const list = await Promise.all(
                citiesArr.map(async city => {
                    const hotel = Hotel.findAndCountAll({
                        where: {
                            city: city
                        }
                    })    
                     return hotel              
                })
               )
            res.status(200).json(list)
        } catch (error) {
            next(error)
        }
    },
    countByType:async (req:Request, res: Response, next: NextFunction) => {
        try {
            const hotelCount = await Hotel.findAndCountAll({where:{type:"hotel"}})
            const apartmentCount = await Hotel.findAndCountAll({where:{type:"apartment"}})
            const resortCount = await Hotel.findAndCountAll({where:{type:"resort"}})
            const villaCount = await Hotel.findAndCountAll({where:{type:"villa"}})
            const cabinCount = await Hotel.findAndCountAll({where:{type:"cabin"}})
           
            res.status(200).json([
                {type: "hotel", count: hotelCount.count, hotels: hotelCount.rows},
                {type: "apartment", count: apartmentCount.count, hotels: apartmentCount.rows},
                {type: "resort", count: resortCount.count, hotels: resortCount.rows},
                {type: "villa", count: villaCount.count, hotels: villaCount.rows},
                {type: "cabin", count: cabinCount.count, hotels: cabinCount.rows},
            ])
        } catch (error) {
            next(error)
        }
    },
    getHotelRooms:async (req:Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const hotel = await Hotel.findByPk(id);
            if(!hotel) return next(createError(404, "Hotel not found!"));
            const list = await Promise.all(hotel.rooms.map((room) => {
                return Room.findByPk(room);
            }));

            return res.status(200).json(list);
        } catch (error) {
            next(error)
        }
    }
}

export default hotelController;