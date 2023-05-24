import { User } from "../models/user.model"
import { createError } from "../utils/error";
import bcrypt from'bcryptjs';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME as string;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;
const ADMIN_COUNTRY = process.env.ADMIN_COUNTRY as string;
const ADMIN_CITY = process.env.ADMIN_CITY as string;
const ADMIN_PHONE = process.env.ADMIN_PHONE as string;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD as string;
const JWT_SECRET = process.env.JWT_SECRET as string;        

const  createAdmin = async () => {
    try {

        let user = await User.findOne({
            where:{
                username: ADMIN_USERNAME,
                email: ADMIN_EMAIL
            }
        });

        if (user) {
            console.log("The user already exists")
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(ADMIN_PASSWORD, salt);

            const admin = User.create({ 
                username: ADMIN_USERNAME,
                email: ADMIN_EMAIL,
                country:ADMIN_COUNTRY,
                city:ADMIN_CITY,
                phone:ADMIN_PHONE,
                password: hash,
                isAdmin: true,
                role:"admin",
            })
            return admin;
        }


    } catch (error) {
        createError(500, "Something went wrong!")
    }

}

export const initDb = () => {
    createAdmin()  
}