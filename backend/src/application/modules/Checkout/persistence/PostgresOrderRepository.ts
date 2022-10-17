import { DataSource, Repository } from 'typeorm';

import { PersistedOrder, Order } from '../../../../models';
import { OrderState } from '../../../../models/Order';
import { PersistedOrderProduct } from '../../../../models/OrderProduct';
import { Persisted } from '../../../../types/Persisted';
import { OrderRepository } from './OrderRepository';

export class PostgresOrderRepository implements OrderRepository {
    private readonly repository: Repository<PersistedOrder>;
    private readonly orderProductRepository: Repository<PersistedOrderProduct>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(PersistedOrder);
        this.orderProductRepository = dataSource.getRepository(PersistedOrderProduct);
    }

    async create(preOrder: Order): Promise<Persisted<Order>> {
        const order = await this.repository.save(preOrder);

        const promises = preOrder.products.map((product) => {
            const orderProduct = new PersistedOrderProduct(product.amount, order.id, product.product.id);

            return this.orderProductRepository.save(orderProduct);
        });

        await Promise.all(promises);

        return {
            id: order.id,
            description: order.description,
            total: order.total,
            currency: order.currency,
            state: order.state,
            products: order.products,
        };
    }

    async findById(id: string): Promise<Persisted<Order> | null> {
        const order = await this.repository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.orderProducts', 'orderProduct')
            .leftJoinAndSelect('orderProduct.product', 'product')
            .where('order.id = :id', { id })
            .getOne();

        if (order) {
            order.products = order.orderProducts;
        }

        return order;
    }

    async findAll(): Promise<Persisted<Order>[]> {
        const orders = await this.repository
            .createQueryBuilder('order')
            .select()
            .leftJoin('order.orderProducts', 'orderProduct')
            .leftJoin('orderProduct.product', 'product')
            .getMany();

        return orders.map((order) => {
            order.products = order.orderProducts;

            return order;
        });
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
