import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { Persisted } from '../types/Persisted';
import { TOrder } from '../types/TOrder';
import { TProduct } from '../types/TProduct';
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

export const getOrders = async (): Promise<Persisted<TOrder>[]> => {
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

export const getProducts = async (): Promise<Persisted<TProduct>[]> => {
    const res = await query({
        url: '/products',
        method: 'GET',
    });

    return res.data.products;
};

export const createProduct = async (product: { name: string; price: number }) => {
    return query({
        url: '/product',
        method: 'POST',
        data: product,
    });
};
