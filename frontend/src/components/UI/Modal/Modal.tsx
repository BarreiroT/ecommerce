import { useEffect } from 'react';

import { Backdrop } from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

const Modal = ({ onClick, children }: { onClick: () => void, children: JSX.Element }) => {

    useEffect(() => {
        const handleKeyUp = (e: KeyboardEvent) => {
            if(e.key === "Escape") {
                onClick();
            }
        }

        document.addEventListener('keyup', handleKeyUp, false);

        return () => {
            document.removeEventListener('keyup', handleKeyUp, false);
        }

    }, [onClick])


    return (
        <>
            <Backdrop onClick={onClick} />
            <div className={[classes['modal-main'], classes["position"]].join(' ')}>
                {children}
            </div>
        </>
    )
}

export default Modal;