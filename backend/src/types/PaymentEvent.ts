export interface PaymentEvent {
    orderId(): string;
    isPending(): boolean;
    isAccepted(): boolean;
    isCanceled(): boolean;
}
