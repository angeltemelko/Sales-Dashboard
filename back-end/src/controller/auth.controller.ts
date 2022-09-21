import {Request, Response} from "express";
import {RegisterValidation} from "../validation/register.validation";

export const Register = (request: Request, response: Response) => {
    const body = request.body;

    const {error} = RegisterValidation.validate(body);

    if(error) {
        return response.status(400).send(error.details)
    }

    if(body.password !== body.password_confirmed) {
        return response.status(400).send("Password's do not match")
    }

    response.send(request.body);
}
