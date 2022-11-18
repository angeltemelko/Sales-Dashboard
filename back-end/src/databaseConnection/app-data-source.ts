import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: 3306,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE,
    entities: [
        'src/entity/*.ts'
    ],
    logging: false,
    synchronize: true
})
