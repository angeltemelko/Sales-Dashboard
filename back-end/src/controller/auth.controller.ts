import { Request, Response } from "express";
import { LoginValidation, RegisterValidation } from "../validation/register.validation";
import { User } from "../entity/user.entity";
import { AppDataSource } from "../databaseConnection/app-data-source";
import bcrypt from "bcryptjs"
import { sign } from "jsonwebtoken";

export type requestWithUser = Request & { user: User }

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
    }, process.env.SECRET_KEY as string);

    response.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    response.send({
        message: 'Success'
    });
}

export const AuthenticatedUser = async (request: requestWithUser, response: Response) => {
    const {password, ...user} = request['user']
    response.send(user);
}

export const Logout = async (request: Request, response: Response) => {

    response.cookie('jwt', '', {maxAge: 0});

    response.send({
        message: 'success'
    });
}

export const UpdateInfo = async (request: requestWithUser, response: Response) => {

    const user = request['user']

    const repository = AppDataSource.getRepository(User);

    await repository.update(user.id, request.body);

    const foundUser = await repository.findOneBy({
        id: user.id
    })

    if (foundUser) {
        const {password, password_confirmed, ...updatedUser} = foundUser
        response.status(200).send(updatedUser)
    }

    response.status(404).send({
        message: 'User not found'
    })
}

export const UpdatePassword = async (request: requestWithUser, response: Response) => {

    const user = request['user']

    if (request.body.password !== user.password) {
        return response.status(400).send({
            message: 'Password not correct'
        })
    }

    const repository = AppDataSource.getRepository(User);

    await repository.update(user.id, {
        password: await bcrypt.hash(request.body.password, 10),
        password_confirmed: await bcrypt.hash(request.body.password, 10),
    });

    return response.status(200).send({
        message: 'Password updated successfully'
    })

}
