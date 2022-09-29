import dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';

import { PostgresSource } from './database';

import { OrderRepository } from './application/modules/Checkout/persistence/OrderRepository';
import { PostgresOrderRepository } from './application/modules/Checkout/persistence/PostgresOrderRepository';
import { InMemoryOrderRepository } from './application/modules/Checkout/test/InMemoryOrderRepository';
import { CheckoutSystem } from './application/modules/Checkout/CheckoutSystem';
import { PaymentSystem } from './application/modules/Checkout/PaymentSystem';

export class TestRunner {
    private readonly database: string;

    private orderRepository!: OrderRepository;

    private source?: DataSource;

    constructor() {
        this.database = process.env.RUNNER_DATABASE || 'in-memory';

        process.env.NODE_ENV = 'testing';
    }

    async generateStorages() {
        if (this.database === 'postgres') {
            this.source = await PostgresSource.initialize();

            this.orderRepository = new PostgresOrderRepository(this.source);

            return;
        }

        this.orderRepository = new InMemoryOrderRepository();
    }

    async cleanStoredData() {
        if (this.database === 'postgres' && this.source) {
            return this.source.destroy();
        }

        (this.orderRepository as InMemoryOrderRepository).drop();
    }

    checkoutSystem() {
        const paymentSystem = new PaymentSystem();
        return new CheckoutSystem(this.orderRepository, paymentSystem);
    }
}
