import { sequelize } from "../database/connection";
import { 
    InferAttributes, 
    InferCreationAttributes, 
    Model, 
    DataTypes, 
    CreationOptional 
} from "sequelize";

type RatingT =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5;

export class Hotel extends Model<InferAttributes<Hotel>, InferCreationAttributes<Hotel>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare type:string;
    declare city: string;
    declare address: string;
    declare distance: string;
    declare photos: CreationOptional<string[]>;
    declare title: string;
    declare description: string;
    declare rating: CreationOptional<RatingT>;
    declare rooms: CreationOptional<number[]>;
    declare cheapestPrice: number;
    declare featured: CreationOptional<boolean>;
}

Hotel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type:{
            type:DataTypes.STRING,
            allowNull:false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        distance: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photos: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue:[]
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
        },
        rooms: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue:[]
        },
        cheapestPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: "Hotels",
        sequelize: sequelize,
    }
);