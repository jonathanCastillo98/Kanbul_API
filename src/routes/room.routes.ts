import { Router } from 'express';
import controllers from '../controllers';
import { verifyAdmin } from '../utils/verifyToken';

const roomRoutes = Router();
const { roomController } = controllers;

roomRoutes.post('/:hotelId', verifyAdmin, roomController.createRoom)
roomRoutes.get('/:id', roomController.readRoom)
roomRoutes.get('/', roomController.getRooms)
roomRoutes.put('/:id', verifyAdmin, roomController.updateRoom)
roomRoutes.delete('/:id/:hotelId', verifyAdmin, roomController.deleteRoom)

export default roomRoutes;
