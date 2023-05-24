"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hotel = void 0;
const connection_1 = require("../database/connection");
const sequelize_1 = require("sequelize");
class Hotel extends sequelize_1.Model {
}
exports.Hotel = Hotel;
Hotel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    distance: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    photos: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        defaultValue: []
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    rooms: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER),
        defaultValue: []
    },
    cheapestPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    featured: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: "Hotels",
    sequelize: connection_1.sequelize,
});
