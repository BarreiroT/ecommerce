import { Persisted } from "../../types/Persisted";
import { TProduct } from "../../types/TProduct";

import classes from './Product.module.css';


export const Product = ({ product }: { product: Persisted<TProduct> }) => {

    return (
        <div className={classes["main"]}>
            <p className={classes["name"]}>{product.name}</p>
        </div>
    )
}