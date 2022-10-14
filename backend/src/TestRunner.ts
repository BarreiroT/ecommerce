import dotenv from 'dotenv';
dotenv.config();

import { CheckoutSystem } from './application/modules/Checkout/CheckoutSystem';
import { PaymentSystem } from './application/modules/Checkout/PaymentSystem';
import { ProductSystem } from './application/modules/Products/ProductSystem';
import { Environment } from './infrastructure/environment/Environment';
import { PostgresEnvironment } from './infrastructure/environment/PostgresEnvironment';
import { InMemoryEnvironment } from './infrastructure/environment/InMemoryEnvironment';

export class TestRunner {
    private readonly database: string;

    private readonly environment: Environment;

    constructor() {
        this.database = process.env.RUNNER_DATABASE || 'in-memory';

        process.env.NODE_ENV = 'testing';

        if (this.database === 'postgres') {
            this.environment = new PostgresEnvironment();
        } else {
            this.environment = new InMemoryEnvironment();
        }
    }

    async generateStorages() {
        return this.environment.generateStorages();
    }

    async cleanStoredData() {
        return this.environment.cleanStoredData();
    }

    checkoutSystem() {
        const paymentSystem = new PaymentSystem();
        return new CheckoutSystem(this.environment.orderRepository, paymentSystem);
    }

    productSystem() {
        return new ProductSystem(this.environment.productRepository);
    }
}
