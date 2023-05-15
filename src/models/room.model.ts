import { sequelize } from "../database/connection";
import { 
    InferAttributes, 
    InferCreationAttributes, 
    Model, 
    DataTypes, 
    CreationOptional 
} from "sequelize";

type RoomNumbersT = {
    number:number,
    unavailableDates: Date[]
}

export class Room extends Model<InferAttributes<Room>, InferCreationAttributes<Room>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare price: number;
    declare maxPeople: number;
    declare description: string;
    declare roomNumbers: CreationOptional<RoomNumbersT[]>;
}

Room.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title:{
            type: DataTypes.STRING,
            allowNull:false
        },
        price:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        maxPeople:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        roomNumbers:{
            type: DataTypes.ARRAY(DataTypes.JSON)
        }
    },
    {
        tableName: "Rooms",
        sequelize: sequelize,
    }
);