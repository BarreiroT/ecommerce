import { Product } from '../../../../models/Product';
import { Persisted } from '../../../../types/Persisted';

export interface ProductRepository {
    create(product: Product): Promise<Persisted<Product>>;

    findById(id: string): Promise<Persisted<Product> | null>;

    findAll(): Promise<Persisted<Product>[]>;
}
