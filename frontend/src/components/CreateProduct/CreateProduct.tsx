import React, { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Modal from "../UI/Modal/Modal"

import classes from './CreateProduct.module.css'
import { createProduct } from "../../api/API";

export const CreateProduct = ({ onCloseModal }: { onCloseModal: () => void }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    const queryClient = useQueryClient();

    const onSuccess = () => {
        queryClient.invalidateQueries(["products"]);
        onCloseModal();
    }


    const { mutate } = useMutation(createProduct, {
        onSuccess
    })

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        mutate({ name, price });
    }

    const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(e.target.value))
    }

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    return (
        <Modal onClick={onCloseModal}>
            <div className={classes["main"]}>
                <form onSubmit={onSubmit} className={classes["form"]}>
                    <h2 className={classes["title"]}>Crear Producto</h2>
                    <label htmlFor="name">Nombre: </label>
                    <input id="name" type="text" className={classes["input"]} value={name} onChange={onChangeName} />
                    <label htmlFor="price">Precio: </label>
                    <input id="price" type="number" className={classes["input"]} value={price} onChange={onChangePrice} />
                    <button type="submit" className={classes["button"]}>Crear</button>
                </form>
            </div>
        </Modal>
    )
};