import { Sequelize } from "sequelize";
import * as pg from 'pg';

const DB_NAME = process.env.DB_NAME as string;
const DB_USER = process.env.DB_USER as string;
const DB_PASS = process.env.DB_PASS as string;
const DB_HOST = process.env.DB_HOST as string;
const DB_URI = process.env.DB_URI as string;

// export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
//   host: DB_HOST,
//   dialect: 'postgres',
// });

export const sequelize = new Sequelize(DB_URI,{
  dialect:'postgres',
  dialectModule: pg,
})

export const init = async () => {
  try {
    await sequelize.sync({force:false});
    console.log('DB Connection success');
  } catch (error) {
    console.error('Connection to the DB failed:', error);
  }
}