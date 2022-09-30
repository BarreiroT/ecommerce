export enum OrderState {
    New = 'Nuevo',
    Pending = 'Pendiente de Pago',
    Payed = 'Pagado',
    Canceled = 'Cancelada',
}

export type TOrder = {
    id: string;
    description: string;

    amount: number;
    currency: string;

    state: OrderState;
};
