import { Product } from '../models/Product';
import { Customer } from '../types/Customer';
import { PaymentEvent } from '../types/PaymentEvent';
import { Persisted } from '../types/Persisted';
import { CheckoutSystem } from './modules/Checkout/CheckoutSystem';
import { ProductSystem } from './modules/Products/ProductSystem';

export class Application {
    private readonly checkoutSystem: CheckoutSystem;
    private readonly productSystem: ProductSystem;

    constructor(checkoutSystem: CheckoutSystem, productSystem: ProductSystem) {
        this.checkoutSystem = checkoutSystem;
        this.productSystem = productSystem;
    }

    getOrders() {
        return this.checkoutSystem.findAllOrders();
    }

    createOrder(products: Persisted<Product>[]) {
        return this.checkoutSystem.createOrder(products);
    }

    startCheckoutProcess(data: { orderId: string; customer?: Customer }) {
        return this.checkoutSystem.startsCheckoutProcess(data);
    }

    processCheckoutEvent(event: PaymentEvent) {
        return this.checkoutSystem.processCheckoutEvent(event);
    }

    createProduct(name: string, price: number) {
        return this.productSystem.create(name, price);
    }

    getProducts() {
        return this.productSystem.findAll();
    }
}
