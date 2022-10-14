import { OrderRepository } from '../../application/modules/Checkout/persistence/OrderRepository';
import { ProductRepository } from '../../application/modules/Products/persistence/ProductRepository';

export interface Environment {
    orderRepository: OrderRepository;
    productRepository: ProductRepository;

    generateStorages(): Promise<void>;

    cleanStoredData(): Promise<void>;
}
