import { CheckoutSystem } from '../../application/modules/Checkout/CheckoutSystem';
import { PaymentSystem } from '../../application/modules/Checkout/PaymentSystem';
import { OrderRepository } from '../../application/modules/Checkout/persistence/OrderRepository';
import { ProductRepository } from '../../application/modules/Products/persistence/ProductRepository';
import { ProductSystem } from '../../application/modules/Products/ProductSystem';

export abstract class Environment {
    abstract orderRepository: OrderRepository;
    abstract productRepository: ProductRepository;

    abstract generateStorages(): Promise<void>;

    abstract cleanStoredData(): Promise<void>;

    checkoutSystem() {
        const paymentSystem = new PaymentSystem();
        return new CheckoutSystem(this.orderRepository, paymentSystem);
    }

    productSystem() {
        return new ProductSystem(this.productRepository);
    }
}
