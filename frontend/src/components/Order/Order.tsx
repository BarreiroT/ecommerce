import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { generateOrderPayment } from "../../api/API";

import { OrderState, TOrder } from "../../types/TOrder"

import classes from './Order.module.css';

const stateClasses = (state: OrderState) => {
    if(state === OrderState.Pending) {
        return classes["pending-state"];
    } else if(state === OrderState.Payed) {
        return classes["payed-state"];
    } else if(state === OrderState.Canceled) {
        return classes["canceled-state"];
    }

    return classes["new-state"];
}

const redirectTo = (url: string) => {
    window.location.href = url;
}

export const Order = ({ order }: { order: TOrder }) => {
    const onSuccess = (response: AxiosResponse) => {
        const paymentUrl = response.data.redirectUrl;

        redirectTo(paymentUrl)
    }

    const { mutate, isLoading } = useMutation(generateOrderPayment, {
        onSuccess
    })

    const canGeneratePayment = order.state === OrderState.New;

    const onGeneratePayment = () => mutate(order.id);


    return (
        <div className={classes["main"]}>
            <div className={classes["amount-container"]}>
                <p className={classes["amount"]}>{order.amount}</p>
                <p>{order.currency}</p>
            </div>
            <div className={classes["state-container"]}>
                <p className={stateClasses(order.state)}>{order.state}</p>
            </div>
            <div className={classes["button-container"]}>
                <button disabled={!canGeneratePayment} onClick={onGeneratePayment}>{isLoading ? 'Cargando...' : 'Generar Pago'}</button>
            </div>
        </div>
    )
}