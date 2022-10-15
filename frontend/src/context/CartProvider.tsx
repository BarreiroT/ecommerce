import { createContext, ReactElement, useEffect, useState } from "react";
import { Persisted } from "../types/Persisted";
import { TProduct } from "../types/TProduct";

type Items = { [key: string]: { amount: number, name: string, price: number } };

type TCartProvider = {
    increaseItemAmount: (product: Persisted<TProduct>) => void;
    decreaseItemAmount: (product: Persisted<TProduct>) => void;
    getAmountInCart: (productId: string) => number;
}

const CartContext = createContext<TCartProvider>({
    increaseItemAmount: () => 0,
    decreaseItemAmount: () => 0,
    getAmountInCart: () => 0
});

const CART_ITEMS_KEY = "cart_items";

const CartProvider = ({ children }: { children: ReactElement }) => {
    const [items, setItems] = useState<Items>({});

    function persistCart(newItems: Items) {
        localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(newItems));
    }

    function increaseItemAmount(product: Persisted<TProduct>) {
        setItems((oldItems => {
            const newItems = { ...oldItems };
            const amount = (newItems[product.id]?.amount || 0) + 1;

            newItems[product.id] = {
                amount,
                price: product.price,
                name: product.name
            }

            persistCart(newItems);

            return newItems;
        }));
    }

    function decreaseItemAmount(product: Persisted<TProduct>) {
        setItems((oldItems) => {
            const newItems = { ...oldItems };

            const amount = (newItems[product.id]?.amount || 0) - 1;

            if(amount < 1) {
                delete newItems[product.id];
                return newItems;
            }

            newItems[product.id] = {
                amount,
                price: product.price,
                name: product.name
            }

            persistCart(newItems);

            return newItems;
        });
    }

    function getAmountInCart(productId: string) {
        return items[productId]?.amount || 0
    }

    useEffect(() => {
        const existingItems = localStorage.getItem(CART_ITEMS_KEY);
        if(existingItems) {
            setItems(JSON.parse(existingItems));
        }
    }, []);

    return (
        <CartContext.Provider value={{ increaseItemAmount, decreaseItemAmount, getAmountInCart }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider, CartContext }