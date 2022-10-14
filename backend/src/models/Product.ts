import { Column, Entity } from 'typeorm';
import { Base } from './Base';

export interface Product {
    name: string;

    price: number;

    currency: string;
}

@Entity({ name: 'products' })
export class PersistedProduct extends Base implements Product {
    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    currency: string;

    constructor(name: string, price: number, currency: string) {
        super();
        this.name = name;
        this.price = price;
        this.currency = currency;
    }
}
