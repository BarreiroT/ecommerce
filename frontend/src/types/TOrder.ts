export enum OrderState {
    New = 'Nuevo',
    Pending = 'Pendiente de Pago',
    Payed = 'Pagado',
    Canceled = 'Cancelada',
}

export type TOrder = {
    description: string;

    amount: number;
    currency: string;

    state: OrderState;
};
