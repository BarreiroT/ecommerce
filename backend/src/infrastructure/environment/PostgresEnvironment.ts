import { DataSource } from 'typeorm';

import { PostgresOrderRepository } from '../../application/modules/Checkout/persistence/PostgresOrderRepository';
import { PostgresProductRepository } from '../../application/modules/Products/persistence/PostgresProductRepository';
import { Environment } from './Environment';
import { PostgresSource } from '../../database';

export class PostgresEnvironment extends Environment {
    source!: DataSource | null;
    orderRepository!: PostgresOrderRepository;
    productRepository!: PostgresProductRepository;

    constructor(source?: DataSource) {
        super();
        if (source) {
            this.source = source;
            this.generateStorages();
        }
    }

    async generateStorages() {
        if (!this.source?.isInitialized) {
            this.source = await PostgresSource.initialize();
        }

        this.orderRepository = new PostgresOrderRepository(this.source);
        this.productRepository = new PostgresProductRepository(this.source);
    }

    async cleanStoredData(): Promise<void> {
        await this.source?.destroy();
        this.source = null;
    }
}
