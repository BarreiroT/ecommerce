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
