import { Order, OrderState } from '../../../../models/Order';
import { Persisted } from '../../../../types/Persisted';

export interface OrderRepository {
    create(order: Order): Promise<Persisted<Order>>;

    findById(id: string): Promise<Persisted<Order> | null>;

    updateOrderState(orderState: OrderState, orderId: string): Promise<boolean>;
}
