import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "mysqlcontainer",
    port: 3306,
    username: 'root',
    password: 'admin',
    database: 'sales_db',
    entities: [
        'src/entity/*.ts'
    ],
    logging: false,
    synchronize: true
})
