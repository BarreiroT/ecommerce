import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../../api/API"
import { Loader } from "../../components/UI/Loader/Loader"

import classes from './Products.module.css';
import { Product } from "../../components/Product/Product";

export const Products = () => {

    const { isLoading, data } = useQuery(["products"], getProducts, {
        retry: false,
        refetchOnWindowFocus: false
    })

    if(isLoading) {
        return <Loader center />
    }

    return (
        <div className={classes["container"]}>
            {data?.map(product => <Product key={product.id} product={product} />)}
        </div>
    )
}