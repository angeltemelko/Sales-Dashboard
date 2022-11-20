import * as dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { AppDataSource } from './databaseConnection/app-data-source';
import cookieParser from 'cookie-parser';

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use(
        cors({
            credentials: true,
            origin: ['http://localhost:3000'],
        })
    );

    routes(app);

    const port: number = 8000;

    app.listen(port, () => {
        console.log(`listening to port ${port}`);
    });
});
