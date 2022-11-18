import { Request, Response } from 'express';
import { AppDataSource } from '../databaseConnection/app-data-source';
import { Role } from '../entity/role.entity';

export const GetRolesAsync = async (
    request: Request,
    response: Response
): Promise<Response | void> => {
    const rolesRepository = AppDataSource.getRepository(Role);

    response.send(await rolesRepository.find());
};

export const CreateRoleAsync = async (
    request: Request,
    response: Response
): Promise<Response | void> => {
    const { name, permissions } = request.body;

    const rolesRepository = AppDataSource.getRepository(Role);

    const role = rolesRepository.save({
        name: name,
        permission: permissions.map((id: number) => ({ id })),
    });

    response.send(role);
};

export const GetRoleByIdAsync = async (
    request: Request,
    response: Response
): Promise<Response | void> => {
    const roleId = Number(request.params.id);

    const rolesRepository = AppDataSource.getRepository(Role);

    response.send(
        await rolesRepository.findOne({
            where: {
                id: roleId,
            },
            relations: ['permissions'],
        })
    );
};

export const UpdateRoleByIdAsync = async (
    request: Request,
    response: Response
): Promise<Response | void> => {
    const { name, permission } = request.body;

    const roleId = Number(request.params.id);

    const roleRepository = AppDataSource.getRepository(Role);

    roleRepository
        .save({
            id: roleId,
            name,
            permissions: permission.map((id: number) => ({ id })),
        })
        .then((product) => {
            response.send(product);
        });
};

export const DeleteRoleByIdAsync = async (
    request: Request,
    response: Response
): Promise<Response | void> => {
    const roleId = Number(request.params.id);

    const rolesRepository = AppDataSource.getRepository(Role);

    await rolesRepository.delete(roleId);

    response.status(204).send({
        message: 'User successfully deleted',
    });
};
