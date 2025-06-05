import { IProductRepository } from "../../interface/product.interface"
import { Product } from "../../model/product.model";
import { MockProductRepository } from "../../repository/mockProduct.repository";
import { ProductFactory } from "../../utils/fixtures";
import { ProductService } from "../product.service";
import { faker } from '@faker-js/faker';



const mockProduct = (rest: any) => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: +faker.commerce.price(),
        ...rest
    }
}

describe("productService", () => {

    let repository: IProductRepository;

    beforeEach(() => {
        repository = new MockProductRepository();
    })

    afterEach(() => {
        repository = {} as MockProductRepository;
    })

    describe("createProduct", () => {
        test("should create product", async () => {
            const service = new ProductService(repository);
            const reqBody = mockProduct({
                stock: faker.number.int({ min: 10, max: 1000 })
            });

            const result = await service.create(reqBody);

            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
            });
        })

        test("should throw error when unable to create product", async () => {
            const service = new ProductService(repository);
            const reqBody = mockProduct({
                stock: faker.number.int({ min: 10, max: 1000 })
            });

            jest.spyOn(repository, "create").mockImplementationOnce(() => Promise.resolve({} as Product));

            await expect(service.create(reqBody)).rejects.toThrow("unable to create product");
        })
    })

    describe("updateProduct", () => {
        test("should update product", async () => {
            const service = new ProductService(repository);
            const reqBody = mockProduct({
                stock: faker.number.int({ min: 10, max: 1000 }),
                id: faker.number.int({ min: 1, max: 1000})
            })

            const result = await service.update(reqBody.id, reqBody);

            expect(result).toMatchObject(reqBody);
        })

        test("should throw error when product does not exist", async () => {
            const service = new ProductService(repository);

            jest.spyOn(repository, "update").mockImplementationOnce(() => Promise.reject(new Error("product does not exist")));

            await expect(service.update(0, {})).rejects.toThrow("product does not exist");
        })
    })

    describe("getProducts", () => {
        test("shoud get products", async () => {
            const service = new ProductService(repository);
            const randomLimit = faker.number.int({ min: 10, max: 50 });
            const products = ProductFactory.buildList(randomLimit);

            jest.spyOn(repository, "find").mockImplementationOnce(() => Promise.resolve(products))

            const result = await service.getProducts(randomLimit,0);
            // console.log(result);
            expect(result.length).toEqual(randomLimit);
            expect(result).toMatchObject(products);

        })

        
        test("should throw error when products do not exist", async () => {
            const service = new ProductService(repository);

            jest.spyOn(repository, "find").mockImplementationOnce(() => Promise.reject(new Error("products do not exist")));

            await expect(service.getProducts(0,0)).rejects.toThrow("products do not exist");
        })
    })

    describe("getProduct", () => {
        test("should get product", async () => {
            const service = new ProductService(repository);
            const product = ProductFactory.build();

            jest.spyOn(repository, "findOne").mockImplementationOnce(() => Promise.resolve(product));

            const result = await service.getProduct(product.id!);

            expect(result).toMatchObject(product);
        })

        test("should throw error when product do not exist", async () => {
            const service = new ProductService(repository);

            jest.spyOn(repository, "findOne").mockImplementationOnce(() => Promise.reject(new Error("product does not exist")));

            await expect(service.getProduct(1)).rejects.toThrow("product does not exist");
        })
    })

    describe("deleteProduct", () => {
        test("should delete product", async () => {
            const service = new ProductService(repository);
            const product = ProductFactory.build();
            jest.spyOn(repository, "delete").mockImplementationOnce(() => Promise.resolve({ id: product.id! }));

            const result = await service.delete(product.id!);

            expect(result).toMatchObject({
                id: product.id
            });
        })
    })

})