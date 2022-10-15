import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../../api/API"

import { Loader } from "../../components/UI/Loader/Loader"
import { Product } from "../../components/Product/Product";
import { useState } from "react";
import { CreateProduct } from "../../components/CreateProduct/CreateProduct";

import classes from './Products.module.css';

export const Products = () => {
    const [openCreateModal, setOpenCreateModal] = useState(false);

    const onOpenCreateModal = () => setOpenCreateModal(true);
    const onCloseCreateModal = () => setOpenCreateModal(false);

    const { isLoading, data } = useQuery(["products"], getProducts, {
        retry: false,
        refetchOnWindowFocus: false
    })

    return (
        <>
            {openCreateModal && <CreateProduct onCloseModal={onCloseCreateModal} />}
            <div className='header'>
                <button className='create-button' onClick={onOpenCreateModal}>Nuevo Producto</button>
            </div>
            {isLoading && !data && <Loader center />}
            <div className={classes["container"]}>
                {data?.map(product => <Product key={product.id} product={product} />)}
            </div>
        </>
    )
}