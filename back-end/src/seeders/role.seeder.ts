import { AppDataSource } from '../databaseConnection/app-data-source';
import { Permission } from '../entity/permission.entity';
import { Role } from '../entity/role.entity';
import { Repository } from 'typeorm';

AppDataSource.initialize().then(async () => {
    const permissionsRepository = AppDataSource.getRepository(Permission);

    const permissionNames: string[] = [
        'view_users',
        'edit_users',
        'view_roles',
        'edit_roles',
        'view_products',
        'edit_products',
        'view_orders',
        'edit_orders',
    ];

    let permissions: Permission[] = [];

    for (const permission of permissionNames) {
        permissions.push(
            await permissionsRepository.save({
                name: permission,
            })
        );
    }

    const roleRepository: Repository<Role> = AppDataSource.getRepository(Role);

    await roleRepository.save({
        name: 'Admin',
        permissions,
    });

    await roleRepository.save({
        name: 'Editor',
        permissions: permissions.filter(
            (permissions: Permission) => permissions.name !== 'edit_roles'
        ),
    });

    await roleRepository.save({
        name: 'Viewer',
        permissions: permissions.filter(
            (permissions: Permission) => !permissions.name.startsWith('edit')
        ),
    });

    process.exit(0);
});
