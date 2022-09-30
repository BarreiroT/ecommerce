import { useQuery } from "@tanstack/react-query"
import { getOrders } from "../../api/API"
import { Order } from "../../types/Order"
import { Loader } from "../UI/Loader/Loader"
import { OrderComponent } from "./Order";

import classes from './Orders.module.css';

export const Orders = () => {

    const { isLoading, data } = useQuery<Order[]>(["orders"], getOrders, {
        retry: false,
        refetchOnWindowFocus: false
    })

    if(isLoading) {
        return <Loader center />
    }

    return (
        <div className={classes["order-list"]}>
            {data?.map(order => <OrderComponent key={order.id} order={order} />)}
        </div>
    )
}