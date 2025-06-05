import express, {Request, Response, NextFunction} from 'express';
import { ProductService } from '../service/product.service';
import { ProductRepository } from '../repository/product.repository';
import { RequestValidator } from '../utils/fixtures/requestValidator';
import { CreateProductRequest, UpdateProductRequest } from '../dto/product.dto';

import { IProductRepository } from "../interface/product.interface";

// TEMP TEST — force type check
const testRepo: IProductRepository = new ProductRepository();

const router = express.Router();
export const productService = new ProductService( new ProductRepository() );

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { errors, input } = await RequestValidator(CreateProductRequest, req.body);
    
        if (errors) {
            res.status(400).json(errors);
            return; 
        }
    
        const data = await productService.create(input);
        res.status(201).json(data);
        return;
    } catch (error) {
        const err = error as Error;
        res.status(500).json(err.message);
        return;
    }
});

router.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { errors, input } = await RequestValidator(UpdateProductRequest, req.body);
        
        const id = parseInt(req.params.id) || 0;

        if (errors) {
            res.status(400).json(errors);
            return; 
        }
    
        const data = await productService.update(id, input);
        res.status(200).json(data);
        return;
    } catch (error) {
        const err = error as Error;
        res.status(500).json(err.message);
        return;
    }
});

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const limit = Number(req.query["limit"]);
    const offset = Number(req.query["offset"]);

    try {  
        const data = await productService.getProducts(limit, offset);
        res.status(200).json(data);
        return;
    } catch (error) {
        const err = error as Error;
        res.status(500).json(err.message);
        return;
    }
});

router.get("/:id", async(req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id) || 0;
    try {    
        const data = await productService.getProduct(id);
        res.status(200).json(data);
        return;
    } catch (error) {
        const err = error as Error;
        res.status(500).json(err.message);
        return;
    }
})

router.delete("/:id", async(req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id) || 0;
    try {    
        const data = await productService.delete(id);
        res.status(200).json(data);
        return;
    } catch (error) {
        const err = error as Error;
        res.status(500).json(err.message);
        return;
    }
})

export default router;