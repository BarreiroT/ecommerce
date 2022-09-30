import { Column, Entity } from 'typeorm';
import { Base } from './Base';

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

    constructor(
        { description, amount, currency, state }: Order = {
            description: '',
            amount: 0,
            currency: '',
            state: OrderState.New,
        },
    ) {
        super();
        this.description = description;
        this.amount = amount;
        this.currency = currency;
        this.state = state;
    }
}
