import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from './Base';
import { Order, PersistedOrder } from './Order';
import { PersistedProduct } from './Product';

@Entity({ name: 'order_products' })
export class OrderProduct extends Base {
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

    constructor(orderId: string, productId: string) {
        super();
        this.orderId = orderId;
        this.productId = productId;
    }
}
