import { PrismaClient } from "../../generated/prisma";
import { CreateProductRequest, UpdateProductRequest } from "../dto/product.dto";
import { IProductRepository } from "../interface/product.interface";
import { Product } from "../model/product.model";

export class ProductRepository implements IProductRepository {

    _prisma: PrismaClient;

    constructor() {
        this._prisma = new PrismaClient();
    }

    async create(data: CreateProductRequest): Promise<Product> {
        return this._prisma.product.create({
            data
        })
    }
    async update(id: number, data: UpdateProductRequest): Promise<Product> {
        return this._prisma.product.update({
            where: { id },
            data,
        });
    }
    async delete(id: number): Promise<{id: number}> {
        return this._prisma.product.delete({
            where: {id},
        })
    }
    async find(limit: number, offset: number): Promise<Product[]> {
        return this._prisma.product.findMany({
            take: limit,
            skip: offset
        })
    }
    async findOne(id: number): Promise<Product> {
        const product = await this._prisma.product.findFirst({
            where: { id },
        });

        if (product) {
            return Promise.resolve(product);
        }

        throw new Error("product not found");
    }
}