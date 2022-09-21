import { Request, Response } from "express";
import { LoginValidation, RegisterValidation } from "../validation/register.validation";
import { User } from "../entity/user.entity";
import { AppDataSource } from "../databaseConnection/app-data-source";
import bcrypt from "bcryptjs"
import { sign, verify } from "jsonwebtoken";

export const Register = async (request: Request, response: Response) => {
    const body = request.body;

    const {error} = RegisterValidation.validate(body);

    if (error) {
        return response.status(400).send(error.details)
    }

    if (body.password !== body.password_confirmed) {
        return response.status(400).send("Password's do not match")
    }

    const repository = AppDataSource.getRepository(User);

    const {password, password_confirmed, ...user} = await repository.save({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
        password_confirmed: await bcrypt.hash(body.password, 10)
    })

    response.send(user);
}

export const Login = async (request: Request, response: Response) => {

    const {error} = LoginValidation.validate(request.body);

    if (error) {
        response.status(400).send(error.message);
    }

    const repository = AppDataSource.getRepository(User);

    const user = await repository.findOneBy({
        email: request.body.email
    })

    if (!user) {
        return response.status(404).send({
            message: "User not found"
        })
    }

    if (!(await bcrypt.compare(request.body.password, user.password))) {
        return response.status(400).send({
            message: 'Password not correct'
        })
    }

    const token = sign({
        id: user.id
    }, "secret");

    response.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    response.send({
        message: 'Success'
    });
}

export const AuthenticatedUser = async (request: Request, response: Response) => {
    const jwt = request.cookies['jwt'];

    const payload: any = verify(jwt, "secret");

    if (!payload) {
        response.status(401).send({
            message: "unauthenticated"
        })
    }

    const repository = AppDataSource.getRepository(User);

    const {password, password_confirmed, ...user}: any = await repository.findOneBy({
        id: payload.id
    })

    response.send(user);
}
