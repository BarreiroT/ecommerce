import { DataSource } from 'typeorm';

import { PostgresOrderRepository } from '../../application/modules/Checkout/persistence/PostgresOrderRepository';
import { PostgresProductRepository } from '../../application/modules/Products/persistence/PostgresProductRepository';
import { Environment } from './Environment';
import { PostgresSource } from '../../database';

export class PostgresEnvironment implements Environment {
    source!: DataSource;

    orderRepository!: PostgresOrderRepository;
    productRepository!: PostgresProductRepository;

    async generateStorages() {
        this.source = await PostgresSource.initialize();

        this.orderRepository = new PostgresOrderRepository(this.source);
        this.productRepository = new PostgresProductRepository(this.source);
    }

    cleanStoredData(): Promise<void> {
        return this.source.destroy();
    }
}
