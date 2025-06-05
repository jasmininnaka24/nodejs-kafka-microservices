import { CreateProductRequest, UpdateProductRequest } from "../dto/product.dto";
import { IProductRepository } from "../interface/product.interface";

export class ProductService {
    private _repository: IProductRepository;

    constructor(repository: IProductRepository) {
        this._repository = repository;
    }

    async create(input: CreateProductRequest) {
        const data = await this._repository.create(input);
        if (!data.id) {
            throw new Error("unable to create product")
        }

        return data;
    }

    async update(id: number, input: UpdateProductRequest) {
        const data = await this._repository.update(id, input);
        return data;
    }

    async delete(id: number) {
        const response = await this._repository.delete(id);
        // delete record from elastic search
        return response;
    }

    async getProducts(limit: number, offset: number) {
        const data = await this._repository.find(limit, offset);
        return data;
    }

    async getProduct(id: number) {
        const data = await this._repository.findOne(id);
        return data;
    }
}