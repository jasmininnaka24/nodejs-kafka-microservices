import { CreateProductRequest, UpdateProductRequest } from "../dto/product.dto";
import { Product } from "../model/product.model";

export interface IProductRepository {
    create(data: CreateProductRequest): Promise<Product>,
    update(id: number, data: UpdateProductRequest): Promise<Product>;
    delete(id: number): Promise<{id: number}>;
    find(limit: number, offset: number): Promise<Product[]>,
    findOne(id: number): Promise<Product>,
}