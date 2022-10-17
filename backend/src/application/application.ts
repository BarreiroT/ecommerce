import { Environment } from '../infrastructure/environment/Environment';
import { OrderProduct } from '../models/OrderProduct';
import { Customer } from '../types/Customer';
import { PaymentEvent } from '../types/PaymentEvent';
import { CheckoutSystem } from './modules/Checkout/CheckoutSystem';
import { ProductSystem } from './modules/Products/ProductSystem';

export class Application {
    private readonly checkoutSystem: CheckoutSystem;
    private readonly productSystem: ProductSystem;

    constructor(environment: Environment) {
        this.checkoutSystem = environment.checkoutSystem();
        this.productSystem = environment.productSystem();
    }

    getOrders() {
        return this.checkoutSystem.findAllOrders();
    }

    async mapClientOrdersToOrderProducts(orders: { amount: number; productId: string }[]) {
        const promises = orders.map(async (order) => {
            const product = await this.getProductById(order.productId);

            return { amount: order.amount, product };
        });

        return Promise.all(promises);
    }

    createOrder(products: OrderProduct[]) {
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

    getProductById(productId: string) {
        return this.productSystem.findProductById(productId);
    }

    getProducts() {
        return this.productSystem.findAll();
    }
}
