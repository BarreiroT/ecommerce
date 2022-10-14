import { PaymentEvent } from './PaymentEvent';

export type MobbexCheckout = {
    result: boolean;
    data: {
        id: string;
        url: string;
        description: string;
        currency: string;
        total: number;
        created: number;
        intent: { token: string };
        paymentMethods: {}[];
        warnings?: {}[];
    };
};

export type MobbexEvent = {
    type: 'string';
    data: {
        result: boolean;
        view: {
            type: string;
        };
        payment: {
            id: string;
            description: string;
            operation: {
                type: string;
            };
            status: {
                code: string;
                text: string;
                message: string;
            };
            total: number;
            currency: {};
            riskAnalysis: {};
            created: string;
            updated: string;
            reference: string;
            source: {};
        };
        entity: {};
        customer: {};
        user: {};
        source: {};
        checkout: {};
    };
};

export class MobbexPayment implements PaymentEvent {
    private event: MobbexEvent;

    constructor(event: MobbexEvent) {
        this.event = event;
    }

    private statusCode() {
        return Number(this.event.data.payment.status.code);
    }

    isPending(): boolean {
        const status = this.statusCode();

        return status === 1 || status === 2 || status === 3 || status === 100;
    }

    orderId(): string {
        return this.event.data.payment.reference;
    }

    isAccepted(): boolean {
        const status = this.statusCode();

        return status === 200 || status === 201;
    }

    isCanceled(): boolean {
        const status = this.statusCode();

        return status === 400 || status === 402 || status === 403 || (status >= 410 && status <= 417) || status === 601;
    }
}
