import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { apiConstants } from './constants';

const instance = axios.create({
    baseURL: apiConstants.url,
});

type ExtendedAxiosRequest = AxiosPromise & { cancel: () => void };

const GenerateToken = axios.CancelToken.source;

const query = (config: AxiosRequestConfig) => {
    const token = GenerateToken();

    config.cancelToken = token.token;

    const res = instance(config) as ExtendedAxiosRequest;

    res.cancel = () => {
        token.cancel();
    };

    return res;
};

export const getOrders = async () => {
    const res = await query({
        url: '/checkout/orders',
        method: 'GET',
    });

    return res.data.orders;
};

export const createOrder = async (total: number) => {
    return query({
        url: '/checkout/order',
        method: 'POST',
        data: { amount: total },
    });
};

export const generateOrderPayment = async (orderId: string) => {
    return query({
        url: '/checkout/start',
        method: 'POST',
        data: { orderId },
    });
};
