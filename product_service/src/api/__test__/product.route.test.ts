import request from 'supertest';
import express from 'express';
import { faker } from '@faker-js/faker';
import productRoutes, { productService } from '../product.routes'
import { ProductFactory } from '../../utils/fixtures';
import { equal } from 'assert';

const app = express();
app.use(express.json());

app.use(productRoutes);

const mockRequest = () => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: +faker.commerce.price(),
        stock: faker.number.int({ min: 10, max: 100 })
    }
}

describe("Product Routes", () => {
    describe("POST /products", () => {
        test("should create product successfully", async () => {
            const requestBody = mockRequest();
            const product = ProductFactory.build();
            jest.spyOn(productService, "create").mockImplementationOnce(() => Promise.resolve(product))

            const response = await request(app)
                .post("/products")
                .send(requestBody)
                .set("Accept", "application/json")
            expect(response.status).toBe(201);
            expect(response.body).toEqual(product);
        })

        test("should respond with validation error 400", async () => {
            const requestBody = mockRequest();
            const response = await request(app)
                .post("/products")
                .send({ ...requestBody, name: "" })
                .set("Accept", "application/json")
            expect(response.status).toBe(400);
            expect(response.body).toEqual("name should not be empty");
        })

        test("should respond an error if there's internal error", async () => {
            const requestBody = mockRequest();
            jest.spyOn(productService, "create").mockImplementationOnce(() => Promise.reject(new Error("error occured while creating a product")))

            const response = await request(app)
                .post("/products")
                .send(requestBody)
                .set("Accept", "application/json")
            expect(response.status).toBe(500);
            expect(response.body).toEqual("error occured while creating a product");
        })
    })

    describe("PATCH /products/:id", () => {
        test("should update product successfully", async () => {
            const product = ProductFactory.build();
            const requestBody = {
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
            }
            jest.spyOn(productService, "update").mockImplementationOnce(() => Promise.resolve(product))

            const response = await request(app)
                .patch(`/products/${product.id}`)
                .send(requestBody)
                .set("Accept", "application/json")
            expect(response.status).toBe(200);
            expect(response.body).toEqual(product);
        })

        test("should respond with validation error 400", async () => {
            const product = ProductFactory.build();
            const requestBody = {
                name: product.name,
                description: product.description,
                price: -2,
                stock: product.stock,
            }
            const response = await request(app)
                .patch(`/products/${product.id}`)
                .send({ ...requestBody })
                .set("Accept", "application/json")
            expect(response.status).toBe(400);
            expect(response.body).toEqual("price must not be less than 1");
        })

        test("should respond an error if there's internal error", async () => {
            const product = ProductFactory.build();
            const requestBody = mockRequest();

            jest.spyOn(productService, "update").mockImplementationOnce(() => Promise.reject(new Error("error occured while updating a product")))

            const response = await request(app)
                .patch(`/products/${product.id}`)
                .send(requestBody)
                .set("Accept", "application/json")
            expect(response.status).toBe(500);
            expect(response.body).toEqual("error occured while updating a product");
        })
    })

    describe("GET /products?limit=0&offset=0", () => {
        test("should return a range of products based on limit and offset", async () => {
            const randomLimit = faker.number.int({ min: 10, max: 50 });
            const products = ProductFactory.buildList(randomLimit);

            jest.spyOn(productService, "getProducts").mockImplementationOnce(() => Promise.resolve(products))

            const response = await request(app)
                .get(`/products?limit=${randomLimit}&offset=0`)
                .set("Accept", "application/json")
            expect(response.status).toBe(200);
            expect(response.body).toEqual(products);
        })

        test("should respond an error if there's internal error", async () => {
            const requestBody = mockRequest();

            jest.spyOn(productService, "getProducts").mockImplementationOnce(() => Promise.reject(new Error("error occured while getting the products")))

            const response = await request(app)
                .get(`/products?limit=0&offset=0`)
                .send(requestBody)
                .set("Accept", "application/json")
            expect(response.status).toBe(500);
            expect(response.body).toEqual("error occured while getting the products");
        })
    })

    describe("GET /products/:id", () => {
        test("should return a product by id", async () => {
            const product = ProductFactory.build();
            jest.spyOn(productService, "getProduct").mockImplementationOnce(() => Promise.resolve(product))

            const response = await request(app)
                .get(`/products/${product.id}`)
                .set("Accept", "application/json")
            expect(response.status).toBe(200);
            expect(response.body).toEqual(product );
        })
        test("should respond an error if there's internal error", async () => {
            const product = ProductFactory.build()
            const requestBody = mockRequest();

            jest.spyOn(productService, "getProduct").mockImplementationOnce(() => Promise.reject(new Error("error occured while getting the product")))

            const response = await request(app)
                .get(`/products/${product.id}`)
                .send(requestBody)
                .set("Accept", "application/json")
            expect(response.status).toBe(500);
            expect(response.body).toEqual("error occured while getting the product");
        })
    })

    describe("DELETE /products/:id", () => {
        test("should delete a product by id", async () => {
            const product = ProductFactory.build();

            jest.spyOn(productService, "delete").mockImplementationOnce(() => Promise.resolve({id: product.id!}));

            const response = await request(app)
                .delete(`/products/${product.id}`)
                .set("Accept", "application/json")
            expect(response.status).toBe(200);
            expect(productService.delete).toEqual({id: product.id});
        });
    });
})

export default app;