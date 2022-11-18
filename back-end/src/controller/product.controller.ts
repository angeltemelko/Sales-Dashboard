import { Request, Response } from 'express';
import { AppDataSource } from '../databaseConnection/app-data-source';
import { Product } from '../entity/product.entity';

export const GetProductsAsync = async (
    request: Request,
    response: Response
): Promise<Response | void>  => {
    const page: number = parseInt((request.params.page as string) || '1');
    const take: number = parseInt((request.params.take as string) || '10');

    const productRepository = AppDataSource.getRepository(Product);

    const [data, total] = await productRepository.findAndCount({
        take,
        skip: (page - 1) * take,
    });

    response.status(200).send({
        data,
        meta: {
            total,
            take,
            lastPage: Math.ceil(total / take),
        },
    });
};
export const CreateProductAsync = async (
    request: Request,
    response: Response
): Promise<Response | void>  => {
    const productDto: Product = request.body;

    const productRepository = AppDataSource.getRepository(Product);

    await productRepository
        .save({
            description: productDto.description,
            image: productDto.image,
            price: productDto.price,
            title: productDto.title,
        })
        .then((product) => {
            response.send(product);
        });
};
export const DeleteProductByIdAsync = async (
    request: Request,
    response: Response
): Promise<Response | void>  => {
    const productId: number = Number(request.params.id);

    const productRepository = AppDataSource.getRepository(Product);

    await productRepository.delete({
        id: productId,
    });

    response.status(204).send({
        message: 'Product successfully deleted',
    });
};
export const UpdateProductByIdAsync = async (
    request: Request,
    response: Response
): Promise<Response | void>  => {
    const product: Product = request.body;

    const roleId = Number(request.params.id);

    const productRepository = AppDataSource.getRepository(Product);

    await productRepository
        .save({
            id: roleId,
            title: product.title,
            price: product.price,
            image: product.image,
            description: product.description,
        })
        .then((product) => {
            response.status(200).send(product);
        })
        .catch((error) => {
            response.status(500).send(error.message);
        });
};
export const GetProductByIdAsync = async (
    request: Request,
    response: Response
): Promise<Response | void>  => {
    const productId = Number(request.params.id);

    const productRepository = AppDataSource.getRepository(Product);

    response.send(
        await productRepository.findOneBy({
            id: productId,
        })
    );
};