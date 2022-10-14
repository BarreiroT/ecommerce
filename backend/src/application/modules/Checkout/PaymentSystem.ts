import mobbex from 'mobbex';
import { ServerException } from '../../../exceptions/HttpException';
import { Customer } from '../../../types/Customer';
import { MobbexCheckout } from '../../../types/Mobbex';

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
            test: process.env.NODE_ENV !== 'production',
        };

        const mobbexCheckout = (await mobbex.checkout.create(checkout)) as MobbexCheckout;

        if (mobbexCheckout?.result === false) {
            throw new ServerException("Coulnd't generate checkout link.");
        }

        return mobbexCheckout.data.url;
    }
}
