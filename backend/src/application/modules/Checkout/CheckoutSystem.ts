import { NotFoundException, NotValidException } from '../../../exceptions/HttpException';
import { Order } from '../../../models';
import { OrderState } from '../../../models/Order';
import { Customer } from '../../../types/Customer';
import { PaymentEvent } from '../../../types/PaymentEvent';
import { PaymentSystem } from './PaymentSystem';
import { OrderRepository } from './persistence/OrderRepository';

export class CheckoutSystem {
    private orderRepository: OrderRepository;
    private paymentSystem: PaymentSystem;

    constructor(orderRepository: OrderRepository, paymentSystem: PaymentSystem) {
        this.orderRepository = orderRepository;
        this.paymentSystem = paymentSystem;
    }

    findAllOrders() {
        return this.orderRepository.findAll();
    }

    createOrder(amount: number) {
        const order: Order = {
            amount,
            description: 'Gracias por comprar en nuestro ecommerce.',
            currency: 'ARS',
            state: OrderState.New,
        };

        return this.orderRepository.create(order);
    }

    async findOrderById(orderId: string) {
        const order = await this.orderRepository.findById(orderId);

        if (!order) {
            throw new NotFoundException('This order does not exist.');
        }

        return order;
    }

    async updateOrderState(orderState: OrderState, orderId: string) {
        const updated = await this.orderRepository.updateOrderState(orderState, orderId);

        if (!updated) {
            throw new NotValidException("Couldn't update this order.");
        }

        return updated;
    }

    async startsCheckoutProcess({ orderId, customer }: { orderId: string; customer?: Customer }) {
        const order = await this.findOrderById(orderId);

        return this.paymentSystem.generateCheckoutLink({
            total: order.amount,
            description: order.description,
            reference: order.id,
            currency: order.currency,
            customer,
        });
    }

    processCheckoutEvent(event: PaymentEvent) {
        const orderId = event.orderId();

        if (event.isAccepted()) {
            return this.updateOrderState(OrderState.Payed, orderId);
        }

        if (event.isCanceled()) {
            return this.updateOrderState(OrderState.Canceled, orderId);
        }

        if (event.isPending()) {
            return this.updateOrderState(OrderState.Pending, orderId);
        }
    }
}
