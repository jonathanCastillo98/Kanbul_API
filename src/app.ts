import express, { Request, Response } from 'express';
import router from './routes';
const cors = require("cors");
import cookieParser from 'cookie-parser';

const corsOptions = {
    origin: 'http://127.0.0.1:5173',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

const app = express();
app.use(cookieParser())

// Middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/v1/', router);


export default app;