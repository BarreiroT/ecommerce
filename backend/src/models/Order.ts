import { Column, Entity, OneToMany } from 'typeorm';
import { Persisted } from '../types/Persisted';
import { Base } from './Base';
import { OrderProduct } from './OrderProduct';
import { Product } from './Product';

export enum OrderState {
    New = 'Nuevo',
    Pending = 'Pendiente de Pago',
    Payed = 'Pagado',
    Canceled = 'Cancelada',
}

export interface Order {
    description: string;

    amount: number;
    currency: string;

    state: OrderState;

    products: Persisted<Product>[];
}

@Entity({ name: 'orders' })
export class PersistedOrder extends Base implements Order {
    @Column()
    description: string;

    @Column()
    amount: number;

    @Column()
    currency: string;

    @Column({ type: 'enum', enum: OrderState })
    state: OrderState;

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
    orderProducts!: OrderProduct[];

    products: Persisted<Product>[];

    constructor(
        { description, amount, currency, state, products }: Order = {
            description: '',
            amount: 0,
            currency: '',
            state: OrderState.New,
            products: [],
        },
    ) {
        super();
        this.description = description;
        this.amount = amount;
        this.currency = currency;
        this.state = state;
        this.products = products;
    }
}
