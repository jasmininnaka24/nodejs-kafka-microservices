import express, {Request, Response, NextFunction} from  'express';

const router = express.Router();
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "create cart"
    });
    return;
})

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "get carts"
    });
    return;
})

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "update cart"
    });
    return;
})

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "delete cart"
    });
    return;
})

export default router;