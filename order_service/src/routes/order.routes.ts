import express, {Request, Response, NextFunction} from  'express';
import * as service from "../service/order.service";

const router = express.Router();
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.CreateOrder(req.body);
    res.status(200).json(response);
    return;
})

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.GetOrders(req.body);
    res.status(200).json(response);
    return;
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.GetOrder(req.body);
    res.status(200).json(response);
    return;
})


router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.DeleteOrder(req.body);
    res.status(200).json(response);
    return;
})

export default router;