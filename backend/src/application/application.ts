import { Customer } from '../types/Customer';
import { PaymentEvent } from '../types/PaymentEvent';
import { CheckoutSystem } from './modules/Checkout/CheckoutSystem';

export class Application {
    private checkoutSystem: CheckoutSystem;

    constructor(checkoutSystem: CheckoutSystem) {
        this.checkoutSystem = checkoutSystem;
    }

    createOrder(amount: number) {
        return this.checkoutSystem.createOrder(amount);
    }

    startCheckoutProcess(data: { orderId: string; customer?: Customer }) {
        return this.checkoutSystem.startsCheckoutProcess(data);
    }

    processCheckoutEvent(event: PaymentEvent) {
        return this.checkoutSystem.processCheckoutEvent(event);
    }
}
