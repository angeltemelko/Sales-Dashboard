import { NextFunction, Request, Response } from "express";
import { Jwt, verify } from "jsonwebtoken";
import { AppDataSource } from "../databaseConnection/app-data-source";
import { User } from "../entity/user.entity";

export interface IGetUserAuthInfoRequest extends Request {
  user?: User | null;
  jwt?: Jwt;
}

export const AuthMiddleware = async (request: IGetUserAuthInfoRequest, response: Response, next: NextFunction) => {
    try {
        const jwt = request.cookies.jwt;

    const payload: any = verify(jwt, process.env.SECRET_KEY as string);

    if (!payload) {
      response.status(401).send({
        message: "unauthenticated",
      });
    }

    const repository = AppDataSource.getRepository(User);

    request.user = await repository.findOne({
      where: {
        id: payload.id,
      },
      relations: ["role", "role.permissions"],
    });

    next();
  } catch (e) {
    response.send({
      message: "unauthenticated",
    });
  }
};
