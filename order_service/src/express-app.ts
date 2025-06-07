// import productRoutes from './api/product.routes';
import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/order.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);

app.use("/", (req: Request, res: Response, _ : NextFunction) => {
    res.status(200).json({
        message: "Health is up!"
    })
    return;
});

export default app;