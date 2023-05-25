import { Router } from 'express';
import controllers from '../controllers';
import { verifyAdmin } from '../utils/verifyToken';

const roomRoutes = Router();
const { roomController } = controllers;

roomRoutes.post('/:hotelId', verifyAdmin, roomController.createRoom)
roomRoutes.get('/:id', roomController.readRoom)
roomRoutes.get('/', roomController.getRooms)
roomRoutes.put('/availability/:id', roomController.updateRoomAvailability)
roomRoutes.put('/:id', verifyAdmin, roomController.updateRoom)
roomRoutes.delete('/:id', verifyAdmin, roomController.deleteRoom)
roomRoutes.delete('/:id/:hotelId', verifyAdmin, roomController.deleteRoomHotel)

export default roomRoutes;
