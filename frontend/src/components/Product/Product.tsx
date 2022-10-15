import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import { Persisted } from "../../types/Persisted";
import { TProduct } from "../../types/TProduct";

import classes from './Product.module.css';


export const Product = ({ product }: { product: Persisted<TProduct> }) => {
    const { getAmountInCart, increaseItemAmount, decreaseItemAmount } = useContext(CartContext);

    const amountInCart = getAmountInCart(product.id);

    function onDecreaseAmount() {
        decreaseItemAmount(product);
    }

    function onIncreaseAmount() {
        increaseItemAmount(product);
    }

    return (
        <div className={classes["main"]}>
            <p className={classes["name"]}>{product.name}</p>
            <div className={classes["price-container"]}>
                <p className={classes["price"]}>{product.currency}</p>
                <p className={classes["price"]}>{product.price}</p>
            </div>
            <div className={classes["buying-container"]}>
                <button className={classes["amount-button"]} onClick={onDecreaseAmount}>-</button>
                <p className={classes["amount"]}>{amountInCart}</p>
                <button className={classes["amount-button"]} onClick={onIncreaseAmount}>+</button>
            </div>
        </div>
    )
}