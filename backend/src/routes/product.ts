import { Router } from 'express';
import { body } from 'express-validator';
import { createProduct, getProducts } from '../application/modules/Products/ProductAPI';
import { validator } from '../middlewares/validation';

const productRouter = Router();

productRouter.post(
    '/product',
    [
        body('name', 'The product name is invalid.').isString().isLength({ min: 1, max: 250 }),
        body('price', 'The product price is invalid.').isInt({ min: 1 }),
        validator,
    ],
    createProduct,
);

productRouter.get('/products', getProducts);

export { productRouter };
