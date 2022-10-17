import { Product } from '../../../models/Product';
import { Controller } from '../../../types/Controller';
import { Persisted } from '../../../types/Persisted';
import { Application } from '../../application';

export const createProduct: Controller<
    {
        name: string;
        price: number;
    },
    unknown,
    { product: Persisted<Product> }
> = async (req, res, next) => {
    try {
        const application: Application = req.app.locals.application;

        const name = req.body.name;
        const price = req.body.price;

        const product = await application.createProduct(name, price);

        res.status(200).json({ product });
    } catch (err) {
        next(err);
    }
};

export const getProducts: Controller<unknown, unknown, { products: Persisted<Product>[] }> = async (req, res, next) => {
    try {
        const application: Application = req.app.locals.application;

        const products = await application.getProducts();

        res.status(200).json({ products });
    } catch (err) {
        next(err);
    }
};
