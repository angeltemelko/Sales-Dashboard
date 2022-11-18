import { Permission } from '../entity/permission.entity';
import { Request, Response } from 'express';
import { AppDataSource } from '../databaseConnection/app-data-source';

export const GetPermissionsAsync = async (
    request: Request,
    response: Response
): Promise<Response | void> => {
    const permissionsRepository = AppDataSource.getRepository(Permission);

    response.send(await permissionsRepository.find());
};
