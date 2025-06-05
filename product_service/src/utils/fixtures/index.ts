import { faker } from "@faker-js/faker"
import { Factory } from "rosie"
import { Product } from "../../model/product.model"

export const ProductFactory = new Factory<Product>()
    .attr("id", faker.number.int({ min: 10, max: 100 }))
    .attr("name", faker.commerce.productName)
    .attr("description", faker.commerce.productDescription)
    .attr("price", faker.number.int({ min: 10, max: 100 }))
    .attr("stock", faker.number.int({ min: 10, max: 100 }))