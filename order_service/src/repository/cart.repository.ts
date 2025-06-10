import { DB } from "../db/db.connection";
import { carts } from "../db/schema";
import { CartRepositoryType } from "../types/repository.type";

const createCart = async (input: any): Promise<{}> => {
    // connect to db

    const result = await DB.insert(carts).values({
        customerId: input.customerId,
    }).returning({ cartId: carts.id });

    console.log(result);

    // perform db operations
    return Promise.resolve({ message: "successfully created a cart: ", data: result });
}

const findCart = async (input: any): Promise<{}> => {
    const result = await DB.select().from(carts);

    console.log(result);

    return Promise.resolve({
        message: "fetched all carts: ",
        data: result
    });
}

const updateCart = async (input: any): Promise<{}> => {
    return Promise.resolve({});
}

const deleteCart = async (input: any): Promise<{}> => {
    return Promise.resolve({});
}

export const CartRepository: CartRepositoryType = {
    create: createCart,
    find: findCart,
    update: updateCart,
    delete: deleteCart
}