import { Router } from "express";
import { AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword } from "./controller/auth.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";
import {
    CreateUserAsync,
    DeleteUserByIdAsync,
    GetUserByIdAsync,
    GetUsersAsync,
    UpdateUserByIdAsync
} from "./controller/user.controller";

export const routes = (router: Router) => {

    // auth controller
    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.get('/api/user', AuthMiddleware, AuthenticatedUser)
    router.post('/api/logout', AuthMiddleware, Logout)
    router.put('/api/users/info', AuthMiddleware, UpdateInfo)
    router.put('/api/users/password', AuthMiddleware, UpdatePassword)

    // user controller
    router.get('/api/users', AuthMiddleware, GetUsersAsync)
    router.post('/api/users', AuthMiddleware, CreateUserAsync)
    router.get('api/users/:id', AuthMiddleware, GetUserByIdAsync)
    router.put('api/users/:id', AuthMiddleware, UpdateUserByIdAsync)
    router.delete('apo/users/:id', AuthMiddleware, DeleteUserByIdAsync)
}
