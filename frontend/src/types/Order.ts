export enum OrderState {
    New = 'Nuevo',
    Pending = 'Pendiente de Pago',
    Payed = 'Pagado',
    Canceled = 'Cancelada',
}

export type Order = {
    id: string;
    description: string;

    amount: number;
    currency: string;

    state: OrderState;
};
