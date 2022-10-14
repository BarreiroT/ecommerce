import { InMemoryOrderRepository } from '../../application/modules/Checkout/test/InMemoryOrderRepository';
import { InMemoryProductRepository } from '../../application/modules/Products/test/InMemoryProductRepository';
import { Environment } from './Environment';

export class InMemoryEnvironment implements Environment {
    orderRepository!: InMemoryOrderRepository;
    productRepository!: InMemoryProductRepository;

    async generateStorages() {
        this.orderRepository = new InMemoryOrderRepository();
        this.productRepository = new InMemoryProductRepository();
    }

    async cleanStoredData() {
        this.orderRepository.drop();
        this.productRepository.drop();
    }
}
