import { CreateProductRequest, UpdateProductRequest } from "../dto/product.dto";
import { IProductRepository } from "../interface/product.interface";
import { Product } from "../model/product.model";

export class MockProductRepository implements IProductRepository{
    create(data: CreateProductRequest): Promise<Product> {
        const mockProduct = {
            id: 123,
            ...data
        } as Product;

        return Promise.resolve(mockProduct);
    }
    update(id: number, data: UpdateProductRequest): Promise<Product> {
        return Promise.resolve(data as unknown as Product);
    }
    delete(id: number): Promise<{id: number}> {
        return Promise.resolve({id});
    }
    find(limit: number, offset: number): Promise<Product[]> {
        return Promise.resolve([]);
    }
    findOne(id: number): Promise<Product> {
        return Promise.resolve({ id } as unknown as Product);
    }

}