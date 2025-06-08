import express, {Request, Response, NextFunction} from  'express';
import * as service from '../service/cart.service';
import * as repository from '../repository/cart.repository'

const router = express.Router();
const repo = repository.CartRepository;

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.CreateCart(req.body, repo);
    res.status(200).json(response);
    return;
})

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.GetCart(req.body, repo);
    res.status(200).json(response);
    return;
})

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.EditCart(req.body, repo);
    res.status(200).json(response);
    return;
})

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.DeleteCart(req.body, repo);
    res.status(200).json(response);
    return;
})

export default router;