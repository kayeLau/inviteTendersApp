import "reflect-metadata"
import { DataSource } from "typeorm"
import { Bid } from "./entity/bid"
import { User } from "./entity/user"
import { Attendance } from "./entity/attendance"
import { AcMember } from "./entity/acMember"
import { AcPlace } from "./entity/acPlace"
import { AcGroup } from "./entity/acGroup"
import { Material } from "./entity/material"
import { Procurement } from "./entity/procurement"
const config = require('./config/development_config')

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    synchronize: true,
    logging: false,
    entities: [Bid, User, Attendance, AcMember, AcPlace, AcGroup, Material, Procurement],
    migrations: [],
    subscribers: [],
})

export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

export default AppDataSource;