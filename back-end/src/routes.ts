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
import {PermissionMiddleware} from "./middleware/permission.middleware";
import { ExportCSV, GetGraphDataAsync, GetOrdersAsync } from "./controller/order.controller";

export const routes = (router: Router) => {

    // auth controller
    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.get('/api/user', AuthMiddleware, AuthenticatedUser)
    router.post('/api/logout', AuthMiddleware, Logout)
    router.put('/api/users/info', AuthMiddleware, UpdateInfo)
    router.put('/api/users/password', AuthMiddleware, UpdatePassword)

    // user controller
    router.get('/api/users', AuthMiddleware, PermissionMiddleware("users"), GetUsersAsync)
    router.post('/api/users', AuthMiddleware, PermissionMiddleware("users"), CreateUserAsync)
    router.get('api/users/:id', AuthMiddleware, PermissionMiddleware("users"), GetUserByIdAsync)
    router.put('api/users/:id', AuthMiddleware, PermissionMiddleware("users"), UpdateUserByIdAsync)
    router.delete('api/users/:id', AuthMiddleware, PermissionMiddleware("users"), DeleteUserByIdAsync)

    // permission controller
    router.get('api/permissions', AuthMiddleware, GetPermissionsAsync)

    // roles controller
    router.get('api/roles', AuthMiddleware, PermissionMiddleware("roles"), GetRolesAsync)
    router.post('api/role', AuthMiddleware, PermissionMiddleware("roles"), CreateRoleAsync)
    router.delete('api/role/:id', AuthMiddleware, PermissionMiddleware("roles"), DeleteRoleByIdAsync)
    router.put('api/role/:id', AuthMiddleware, PermissionMiddleware("roles"), UpdateRoleByIdAsync)
    router.get('api/role/:id',AuthMiddleware, PermissionMiddleware("roles"), GetRoleByIdAsync)

    // product controller
    router.get('api/products', AuthMiddleware, PermissionMiddleware("products"), GetProductsAsync)
    router.post('api/product', AuthMiddleware, PermissionMiddleware("products"), CreateProductAsync)
    router.delete('api/product/:id', AuthMiddleware, PermissionMiddleware("products"), DeleteProductByIdAsync)
    router.put('api/product/:id', AuthMiddleware, PermissionMiddleware("products"), UpdateProductByIdAsync)
    router.get('api/product/:id',AuthMiddleware, PermissionMiddleware("products"), GetProductByIdAsync)

    // order controller
    router.get('api/orders', AuthMiddleware, PermissionMiddleware("orders"), GetOrdersAsync)
    router.post('api/orders/export-csv', AuthMiddleware, PermissionMiddleware("orders"), ExportCSV)
    router.get('api/orders/export-csv', AuthMiddleware, PermissionMiddleware("orders"), GetGraphDataAsync)
}
