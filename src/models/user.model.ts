import { sequelize } from "../database/connection";
import { 
    InferAttributes, 
    InferCreationAttributes, 
    Model, 
    DataTypes, 
    CreationOptional 
} from "sequelize";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare username: string;    
    declare email: string;    
    declare country: string;    
    declare img: CreationOptional<string>;    
    declare city: string;    
    declare phone: string;    
    declare password: string;    
    declare isAdmin: CreationOptional<boolean>;
    declare role: CreationOptional<string>;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        country:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        img:{
            type:DataTypes.STRING,
            defaultValue: "https://cornerstoneia.com/wp-content/uploads/2019/08/avatar-placeholder-1024x1024.jpeg",
        },
        city:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        phone:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        role:{
            type:DataTypes.STRING,
            defaultValue: "customer"
        }
    },
    {
        tableName: "Users",
        sequelize: sequelize,
    }
);