import { Order } from '../../../../models';
import { OrderState } from '../../../../models/Order';
import { Persisted } from '../../../../types/Persisted';
import { OrderRepository } from '../persistence/OrderRepository';

export class InMemoryOrderRepository implements OrderRepository {
    private orders: Persisted<Order>[] = [];

    create(preOrder: Order): Promise<Persisted<Order>> {
        const order = { id: this.orders.length.toString(), ...preOrder };

        this.orders.push(order);

        return Promise.resolve(order);
    }

    findById(id: string): Promise<Persisted<Order> | null> {
        const order = this.orders.find((o) => o.id === id);

        return Promise.resolve(order || null);
    }

    findAll(): Promise<Persisted<Order>[]> {
        return Promise.resolve(this.orders);
    }

    private findIndexById(id: string) {
        return this.orders.findIndex((o) => o.id === id);
    }

    updateOrderState(orderState: OrderState, orderId: string): Promise<boolean> {
        const index = this.findIndexById(orderId);

        if (index === -1) {
            return Promise.resolve(false);
        }

        this.orders[index].state = orderState;

        return Promise.resolve(true);
    }

    drop() {
        this.orders = [];
    }
}
