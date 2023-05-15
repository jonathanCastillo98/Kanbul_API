"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const connection_1 = require("../database/connection");
const sequelize_1 = require("sequelize");
class Room extends sequelize_1.Model {
}
exports.Room = Room;
Room.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    maxPeople: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    roomNumbers: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSON)
    }
}, {
    tableName: "Rooms",
    sequelize: connection_1.sequelize,
});
