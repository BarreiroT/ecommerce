import { NotFoundException } from '../../../exceptions/HttpException';
import { Product } from '../../../models/Product';
import { ProductRepository } from './persistence/ProductRepository';

export class ProductSystem {
    private readonly repository: ProductRepository;

    constructor(repository: ProductRepository) {
        this.repository = repository;
    }

    create(name: string, price: number) {
        const product: Product = {
            name,
            price,
            currency: 'ARS',
        };

        return this.repository.create(product);
    }

    async findProductById(productId: string) {
        const product = await this.repository.findById(productId);

        if (!product) {
            throw new NotFoundException('This product does not exist.');
        }

        return product;
    }

    findAll() {
        return this.repository.findAll();
    }
}
