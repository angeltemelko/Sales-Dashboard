import { Response, Request } from "express";
import { AppDataSource } from "../databaseConnection/app-data-source";
import { User } from "../entity/user.entity";
import bcrypt from "bcryptjs";

export const GetUsersAsync = async (request: Request, response: Response) => {

    const repository = AppDataSource.getRepository(User);

    const users = await repository.find({
        relations: ['role']
    });

    response.send(users.map(u => {
        const {password, password_confirmed, ...data} = u;

        return data;
    }));
}

export const GetUserByIdAsync = async (request: Request, response: Response) => {

    if(request.body === null) {
        response.send({
            message: "Object cannot be empty"
        })
    }

    const repository = AppDataSource.getRepository(User);

    const {password, password_confirmed, ...user} = await repository.findOne({
        where: {
            id: Number(request.params.id)
        },
        relations: ['role']
    })

    response.send(user)
}

export const CreateUserAsync = async (request: Request, response: Response) => {

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
        password_confirmed: password,
        role: {
            id: role_id
        }
    });

    response.send(createdUser);
}

export const UpdateUserByIdAsync = async (request: Request, response: Response) => {

    if(request.body === null) {
        response.send({
            message: "Object cannot be empty"
        })
    }

    const {role_id, ...body} = request.body;

    const repository = AppDataSource.getRepository(User);

    const user = await repository.findOneBy({
        id: Number(request.params.id)
    })

    if(user === null) {
        response.send({
            message: "User dose not exist"
        })
    }

    await repository.update(request.params.id, {
        ...body,
        role: {
            id: role_id
        }
    })


    const {password, password_confirmed, ...updatedUser} = await repository.findOne({
        where: {
            id: Number(request.params.id)
        },
        relations: ['role']
    })

    response.send(updatedUser).status(200);
}

export const DeleteUserByIdAsync = async (request: Request, response: Response) => {
    const repository = AppDataSource.getRepository(User);

    await repository.delete(request.params.id)

    response.status(204).send({
        message: 'User successfully deleted'
    })
}
