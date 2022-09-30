import mobbex from 'mobbex';
import { ServerException } from '../../../exceptions/HttpException';
import { Customer } from '../../../types/Customer';
import { MobbexCheckout, MobbexEvent } from '../../../types/Mobbex';
import { PaymentEvent } from '../../../types/PaymentEvent';

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

export class PaymentSystem {
    constructor() {
        mobbex.configurations.configure({
            apiKey: process.env.PAYMENT_SYSTEM_API_KEY,
            accessToken: process.env.PAYMENT_SYSTEM_ACCESS_TOKEN,
            auditKey: process.env.PAYMENT_SYSTEM_AUDIT_KEY,
        });
    }

    async generateCheckoutLink({
        total,
        reference,
        description,
        currency,
        customer,
    }: {
        total: number;
        reference: string;
        description: string;
        currency: string;
        customer?: Customer;
    }) {
        const checkout = {
            total,
            reference,
            description,
            currency,
            customer,
            webhook: process.env.MOBBEX_WEBHOOK_URL,
            return_url: process.env.CLIENT_ORIGIN,
        };

        const mobbexCheckout = (await mobbex.checkout.create(checkout)) as MobbexCheckout;

        if (mobbexCheckout?.result === false) {
            throw new ServerException("Coulnd't generate checkout link.");
        }

        return mobbexCheckout.data.url;
    }
}
