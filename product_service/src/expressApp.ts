import productRoutes from './api/product.routes';
import express from 'express';

const app = express();
app.use(express.json());

app.use("/products", productRoutes);

export default app;