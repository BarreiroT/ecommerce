import { Order } from '../models';
import { Customer } from '../types/Customer';
import { PaymentEvent } from '../types/PaymentEvent';
import { CheckoutSystem } from './modules/Checkout/CheckoutSystem';

export class Application {
    private checkoutSystem: CheckoutSystem;

    constructor(checkoutSystem: CheckoutSystem) {
        this.checkoutSystem = checkoutSystem;
    }

    createOrder(order: Order) {
        return this.checkoutSystem.createOrder(order);
    }

    startCheckoutProcess(data: { amount: number; customer: Customer }) {
        const checkoutData = {
            description: 'Gracias por comprar en nuestro ecommerce.',
            currency: 'ARS',
            ...data,
        };
        return this.checkoutSystem.startsCheckoutProcess(checkoutData);
    }

    processCheckoutEvent(event: PaymentEvent) {
        return this.checkoutSystem.processCheckoutEvent(event);
    }
}
