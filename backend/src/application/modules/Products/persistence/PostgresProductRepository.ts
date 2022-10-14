import { DataSource, Repository } from 'typeorm';

import { PersistedProduct, Product } from '../../../../models/Product';
import { Persisted } from '../../../../types/Persisted';
import { ProductRepository } from './ProductRepository';

export class PostgresProductRepository implements ProductRepository {
    private repository: Repository<PersistedProduct>;

    constructor(datasource: DataSource) {
        this.repository = datasource.getRepository(PersistedProduct);
    }

    async create(preProduct: Product): Promise<Persisted<Product>> {
        const product = await this.repository.save(preProduct);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
            currency: product.currency,
        };
    }

    findById(id: string): Promise<Persisted<Product> | null> {
        return this.repository.createQueryBuilder('product').select().where('product.id = :id', { id }).getOne();
    }

    findAll(): Promise<Persisted<Product>[]> {
        return this.repository.createQueryBuilder().select().getMany();
    }
}
