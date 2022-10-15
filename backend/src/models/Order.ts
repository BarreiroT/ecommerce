import { Column, Entity, OneToMany } from 'typeorm';
import { Persisted } from '../types/Persisted';
import { Base } from './Base';
import { OrderProduct, PersistedOrderProduct } from './OrderProduct';
import { Product } from './Product';

export enum OrderState {
    New = 'Nuevo',
    Pending = 'Pendiente de Pago',
    Payed = 'Pagado',
    Canceled = 'Cancelada',
}

export interface Order {
    description: string;

    total: number;
    currency: string;

    state: OrderState;

    products: OrderProduct[];
}

@Entity({ name: 'orders' })
export class PersistedOrder extends Base implements Order {
    @Column()
    description: string;

    @Column()
    total: number;

    @Column()
    currency: string;

    @Column({ type: 'enum', enum: OrderState })
    state: OrderState;

    @OneToMany(() => PersistedOrderProduct, (orderProduct) => orderProduct.order)
    orderProducts!: PersistedOrderProduct[];

    products: OrderProduct[];

    constructor(
        { description, total, currency, state, products }: Order = {
            description: '',
            total: 0,
            currency: '',
            state: OrderState.New,
            products: [],
        },
    ) {
        super();
        this.description = description;
        this.total = total;
        this.currency = currency;
        this.state = state;
        this.products = products;
    }
}
