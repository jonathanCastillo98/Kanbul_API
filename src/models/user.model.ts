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
    declare password: string;    
    declare isAdmin: CreationOptional<boolean>;
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
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: "Users",
        sequelize: sequelize,
    }
);