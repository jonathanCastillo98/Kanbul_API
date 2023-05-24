import { Router } from 'express';
import controllers from '../controllers';
import { verifyAdmin } from '../utils/verifyToken';

const hotelRoutes = Router();
const { hotelController } = controllers;

hotelRoutes.post('/', verifyAdmin, hotelController.createHotel);
hotelRoutes.get('/', hotelController.getHotels);
hotelRoutes.get('/countByCity',hotelController.countByCity);
hotelRoutes.get('/countByType',hotelController.countByType);
hotelRoutes.get('/room/:id',hotelController.getHotelRooms);
hotelRoutes.get('/:id', hotelController.readHotel);
hotelRoutes.put('/:id', verifyAdmin, hotelController.updateHotel);
hotelRoutes.delete('/:id', verifyAdmin, hotelController.deleteHotel);

// hotelRoutes.get('/countByType',hotelController.);

export default hotelRoutes;
