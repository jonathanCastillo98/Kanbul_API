"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors = require("cors");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const corsOptions = {
    origin: 'https://kanbul.vercel.app',
    credentials: true,
    optionSuccessStatus: 200,
};
// const corsOptions = {
//     origin: 'http://localhost:5173',
//     credentials: true,            //access-control-allow-credentials:true
//     optionSuccessStatus: 200,
// }
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
// Middlewares
app.use(cors(corsOptions));
app.use(express_1.default.json());
app.get('/', (req, res, next) => {
    res.status(200).json({ success: "YEEEEEEI" });
});
app.use('/api/v1/', routes_1.default);
exports.default = app;
