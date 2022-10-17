import dotenv from 'dotenv';
dotenv.config();

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

    generateStorages() {
        return this.environment.generateStorages();
    }

    cleanStoredData() {
        return this.environment.cleanStoredData();
    }

    checkoutSystem() {
        return this.environment.checkoutSystem();
    }

    productSystem() {
        return this.environment.productSystem();
    }
}
