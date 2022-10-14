import { Product } from '../../../../models/Product';
import { Persisted } from '../../../../types/Persisted';
import { ProductRepository } from '../persistence/ProductRepository';

export class InMemoryProductRepository implements ProductRepository {
    private products: Persisted<Product>[] = [];

    create(preOrder: Product): Promise<Persisted<Product>> {
        const product = { id: this.products.length.toString(), ...preOrder };

        this.products.push(product);

        return Promise.resolve(product);
    }

    findById(id: string): Promise<Persisted<Product> | null> {
        const product = this.products.find((o) => o.id === id);

        return Promise.resolve(product || null);
    }

    findAll(): Promise<Persisted<Product>[]> {
        return Promise.resolve(this.products);
    }

    drop() {
        this.products = [];
    }
}
