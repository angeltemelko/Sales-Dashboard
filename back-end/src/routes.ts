import { Router } from "express";
import { AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword } from "./controller/auth.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { CreateUserAsync, GetUserByIdAsync, GetUsersAsync, UpdateUserByIdAsync } from "./controller/user.controller";

export const routes = (router: Router) => {

    // auth controller
    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.get('/api/user', AuthMiddleware as any, AuthenticatedUser)
    router.post('/api/logout', AuthMiddleware as any, Logout)
    router.put('/api/users/info', AuthMiddleware as any, UpdateInfo)
    router.put('/api/users/password', AuthMiddleware as any, UpdatePassword)

    // user controller
    router.get('/api/users', AuthMiddleware as any, GetUsersAsync)
    router.post('/api/users', AuthMiddleware as any, CreateUserAsync)
    router.get('api/users/:id', AuthMiddleware as any, GetUserByIdAsync)
    router.put('api/users/:id', AuthMiddleware as any, UpdateUserByIdAsync)
}
