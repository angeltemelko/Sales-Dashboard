import { Role } from '../entity/role.entity';
import { Request } from 'express';
import { User } from '../entity/user.entity';
import { Jwt } from 'jsonwebtoken';

export interface UserDto {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmed: string;
    role: Role;
}

export type requestWithUser = Request & { user?: UserDto };

export interface IGetUserAuthInfoRequest extends Request {
    user?: User | null;
    jwt?: Jwt;
}