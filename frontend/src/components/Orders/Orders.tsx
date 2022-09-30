import { useQuery } from "@tanstack/react-query"
import { getOrders } from "../../api/API"
import { TOrder } from "../../types/TOrder"
import { Loader } from "../UI/Loader/Loader"
import { Order } from "../Order/Order";

import classes from './Orders.module.css';

export const Orders = () => {

    const { isLoading, data } = useQuery<TOrder[]>(["orders"], getOrders, {
        retry: false,
        refetchOnWindowFocus: false
    })

    if(isLoading) {
        return <Loader center />
    }

    return (
        <div className={classes["container"]}>
            <div className={classes["order-list"]}>
                {data?.map(order => <Order key={order.id} order={order} />)}
            </div>
        </div>
    )
}