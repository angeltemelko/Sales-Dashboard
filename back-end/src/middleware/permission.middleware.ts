import {NextFunction, Response} from "express";
import {requestWithUser, UserDto} from "../Dtos/dtos";

export const PermissionMiddleware = (access: string) => {
    return (request: requestWithUser, response: Response, next: NextFunction) => {

        const user: UserDto | undefined = request.user

        const permissions = user!.role.permissions;

        const condition = (request.method === 'GET' && (!permissions.some(p => p.name === `view_${access}` || p.name === `edit_${access}`)))
        || (request.method !== 'GET' && (!permissions.some(p => p.name === `edit_${access}`)))

        if (condition)
            return response.status(401).send("unauthorized")

        next();
    }
}