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
import {GetPermissionsAsync} from "./controller/permission.controller";
import {
    CreateRoleAsync,
    DeleteRoleByIdAsync,
    GetRoleByIdAsync,
    GetRolesAsync,
    UpdateRoleByIdAsync
} from "./controller/role.controller";
import {
    CreateProductAsync,
    DeleteProductByIdAsync, GetProductByIdAsync,
    GetProductsAsync,
    UpdateProductByIdAsync
} from "./controller/product.controller";

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
    router.delete('api/users/:id', AuthMiddleware, DeleteUserByIdAsync)

    // permission controller
    router.get('api/permissions', AuthMiddleware, GetPermissionsAsync)

    // roles controller
    router.get('api/roles', AuthMiddleware, GetRolesAsync)
    router.post('api/role', AuthMiddleware, CreateRoleAsync)
    router.delete('api/role/:id', AuthMiddleware, DeleteRoleByIdAsync)
    router.put('api/role/:id', AuthMiddleware, UpdateRoleByIdAsync)
    router.get('api/role/:id',AuthMiddleware, GetRoleByIdAsync)

    // product controller
    router.get('api/products', AuthMiddleware, GetProductsAsync)
    router.post('api/product', AuthMiddleware, CreateProductAsync)
    router.delete('api/product/:id', AuthMiddleware, DeleteProductByIdAsync)
    router.put('api/product/:id', AuthMiddleware, UpdateProductByIdAsync)
    router.get('api/product/:id',AuthMiddleware, GetProductByIdAsync)
}
