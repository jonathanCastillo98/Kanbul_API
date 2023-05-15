import { NextFunction, Request, Response } from "express";
import { Room } from "../models/room.model";
import { Hotel } from "../models/hotel.model";
import { createError } from "../utils/error";

const roomController = {
    createRoom:async (req:Request, res: Response, next: NextFunction) => {
        try {
            const hotelId = req.params.hotelId;
            const newRoom = await Room.create(req.body);

            try {
                const hotel = await Hotel.findByPk(hotelId);
                if(!hotel) return next(createError(404, "Hotel not found!"));
                const roomsArr = hotel.rooms;
                roomsArr.push(newRoom.id)
                await Hotel.update({
                    rooms:  roomsArr
                },{
                    where:{
                        id: hotelId
                    }
                })
            } catch (error) {
                next(error)
            }
            return res.status(200).json(newRoom)
        } catch (error) {
            next(error)
        }
    },
    updateRoom:async (req:Request, res: Response, next: NextFunction) => {
        try {

            const {id} = req.params;
            const room = await Room.findByPk(id);

            if(!room) return next(createError(404, "Room not found!"));

            await room.update(req.body);
            res.status(200).json(room)
        } catch (error) {
            next(error)
        }
    },
    deleteRoom:async (req:Request, res: Response, next: NextFunction) => {
        try {

            const {id, hotelId} = req.params;
            const room = await Room.findByPk(id);

            if(!room) return next(createError(404, "Room not found!"));

            await room.destroy();

            try {
                const hotel = await Hotel.findByPk(hotelId);
                if(!hotel) return next(createError(404, "Hotel not found!"));
                const roomsArr = hotel.rooms;
                const index = roomsArr.indexOf(room.id);
                roomsArr.splice(index, 1);
                await Hotel.update({
                    rooms:  roomsArr
                },{
                    where:{
                        id: hotelId
                    }
                })
            } catch (error) {
                next(error)
            }

            res.status(200).json("Room deleted successfully!")
        } catch (error) {
            next(error)
        }
    },
    readRoom:async (req:Request, res: Response, next: NextFunction) => {
        try {

            const {id} = req.params;
            const room = await Room.findByPk(id);

            if(!room) return next(createError(404, "Room not found!"));

            res.status(200).json(room)
        } catch (error) {
            next(error)
        }
    },
    getRooms:async (req:Request, res: Response, next: NextFunction) => {
        try {

            const rooms = await Room.findAll();

            if(rooms.length === 0) return next(createError(404, "Room list is empty!"));

            res.status(200).json(rooms)
        } catch (error) {
            next(error)
        }
    }
}

export default roomController;