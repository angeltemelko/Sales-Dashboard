import { Response, Request } from "express";
import { AppDataSource } from "../databaseConnection/app-data-source";
import { User } from "../entity/user.entity";
import bcrypt from "bcryptjs";

export const GetUsersAsync = async (response: Response, request: Request) => {

    const repository = AppDataSource.getRepository(User);

    const users = await repository.find();

    response.send(users.map(u => {
        const {password, password_confirmed, ...data} = u;

        return data;
    }))
}

export const CreateUserAsync = async (response: Response, request: Request) => {

    if(request.body === null) {
        response.send({
            message: "Object cannot be empty"
        })
    }

    const {role_id , ...body} = request.body

    const password = await bcrypt.hash(Math.random().toString(36).slice(-8),10);

    const repository = AppDataSource.getRepository(User);

    const createdUser = repository.create({
        ...body,
        password,
        password_confirmed: password
    });

    response.send(createdUser);
}

export const GetUserByIdAsync = async (response: Response, request: Request) => {

    if(request.body === null) {
        response.send({
            message: "Object cannot be empty"
        })
    }

    const repository = AppDataSource.getRepository(User);

    const {password, password_confirmed, ...user} = await repository.findOneBy({
        id: Number(request.params.id)
    })

    response.send(user)
}

export const UpdateUserByIdAsync = async (response: Response, request: Request) => {

    if(request.body === null) {
        response.send({
            message: "Object cannot be empty"
        })
    }

    const repository = AppDataSource.getRepository(User);

    const user = await repository.findOneBy({
        id: Number(request.params.id)
    })

    if(user === null) {
        response.send({
            message: "User dose not exist"
        })
    }

    const {password, password_confirmed, ...updatedUser} = await repository.findOneBy({
        id: user.id
    })

    response.send(updatedUser).status(200);
}
