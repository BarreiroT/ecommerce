import React, { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Modal from "../UI/Modal/Modal"

import classes from './CreateOrder.module.css'
import { createOrder } from "../../api/API";

export const CreateOrder = ({ onCloseModal }: { onCloseModal: () => void }) => {
    const [total, setTotal] = useState(0);

    const queryClient = useQueryClient();

    const onSuccess = () => {
        queryClient.invalidateQueries(["orders"]);
        onCloseModal();
    }


    const { mutate } = useMutation(createOrder, {
        onSuccess
    })

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        mutate(total);
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTotal(Number(e.target.value))
    }

    return (
        <Modal onClick={onCloseModal}>
            <div className={classes["main"]}>
                <form onSubmit={onSubmit} className={classes["form"]}>
                    <h2 className={classes["title"]}>Crear Orden</h2>
                    <label htmlFor="total">Total: </label>
                    <input id="total" type="number" className={classes["input"]} value={total} onChange={onChange} />
                    <button type="submit" className={classes["button"]}>Crear</button>
                </form>
            </div>
        </Modal>
    )
};