import express, { Request, Response } from 'express';
import router from './routes';
const cors = require("cors");
import cookieParser from 'cookie-parser';

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

const app = express();

// Middlewares
app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions))
app.use('/api/v1/', router);


export default app;