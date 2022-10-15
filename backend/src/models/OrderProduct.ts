import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Persisted } from '../types/Persisted';

import { Base } from './Base';
import { Order, PersistedOrder } from './Order';
import { PersistedProduct, Product } from './Product';

export interface OrderProduct {
    amount: number;

    product: Persisted<Product>;
}

@Entity({ name: 'order_products' })
export class PersistedOrderProduct extends Base implements OrderProduct {
    @Column()
    amount: number;

    @ManyToOne(() => PersistedOrder, (order) => order.id, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'order_id' })
    order!: Order;

    @Column({ name: 'order_id' })
    orderId: string;

    @ManyToOne(() => PersistedProduct, (product) => product.id, {
        onDelete: 'NO ACTION',
    })
    @JoinColumn({ name: 'product_id' })
    product!: PersistedProduct;

    @Column({ name: 'product_id' })
    productId: string;

    constructor(amount: number, orderId: string, productId: string) {
        super();
        this.amount = amount;
        this.orderId = orderId;
        this.productId = productId;
    }
}
