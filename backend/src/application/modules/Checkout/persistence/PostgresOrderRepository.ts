import { DataSource, Repository } from 'typeorm';

import { PersistedOrder, Order } from '../../../../models';
import { OrderState } from '../../../../models/Order';
import { Persisted } from '../../../../types/Persisted';
import { OrderRepository } from './OrderRepository';

export class PostgresOrderRepository implements OrderRepository {
    private repository: Repository<PersistedOrder>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(PersistedOrder);
    }

    async create(preOrder: Order): Promise<Persisted<Order>> {
        const order = await this.repository.save(preOrder);

        return {
            id: order.id,
            description: order.description,
            amount: order.amount,
            currency: order.currency,
            state: order.state,
        };
    }

    findById(id: string): Promise<Persisted<Order> | null> {
        return this.repository.createQueryBuilder('order').select().where('order.id = :id', { id }).getOne();
    }

    findAll(): Promise<Persisted<Order>[]> {
        return this.repository.createQueryBuilder().select().getMany();
    }

    async updateOrderState(orderState: OrderState, orderId: string): Promise<boolean> {
        const res = await this.repository
            .createQueryBuilder()
            .update()
            .set({ state: orderState })
            .where('id = :orderId', { orderId })
            .execute();

        return Boolean(res.affected);
    }
}
