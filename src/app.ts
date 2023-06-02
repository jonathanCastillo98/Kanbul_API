import express, { Request, Response } from 'express';
import router from './routes';
const cors = require("cors");
import cookieParser from 'cookie-parser';

const corsOptions = {
    origin: 'https://kanbul-api.vercel.app',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

const app = express();
app.use(cookieParser())

// Middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.get('/', (req,res,next) => {
    res.status(200).json({success:"YEEEEEEI"})
})
app.use('/api/v1/', router);


export default app;