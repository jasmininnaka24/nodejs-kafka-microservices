import express, {Request, Response, NextFunction} from  'express';

const router = express.Router();
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "create order"
    });
    return;
})

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "get orders"
    });
    return;
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "get order by id"
    });
    return;
})


router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "delete order"
    });
    return;
})

export default router;