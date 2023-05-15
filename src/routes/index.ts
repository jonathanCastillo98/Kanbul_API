import { NextFunction, Request, Response, Router } from 'express';
import hotelRoutes from './hotel.routes';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import roomRoutes from './room.routes';

const router = Router();

router.use('/hotels', hotelRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/rooms', roomRoutes)

router.use((err:Error, req: Request, res:Response, next:NextFunction) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

export default router;
