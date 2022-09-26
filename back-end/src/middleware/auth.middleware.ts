import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppDataSource } from "../databaseConnection/app-data-source";
import { User } from "../entity/user.entity";

export const AuthMiddleware = async (response: Response, request: Request, next: NextFunction) => {
    try {
        const jwt = request.cookies['jwt'];

        const payload: any = verify(jwt, process.env.SECRET_KEY as string);

        if (!payload) {
            response.status(401).send({
                message: "unauthenticated"
            })
        }

        const repository = AppDataSource.getRepository(User);

        request['user'] = await repository.findOneBy({
            id: payload.id
        })

        next();

    } catch (e) {
        response.send({
            message: "unauthenticated"
        })
    }
}
