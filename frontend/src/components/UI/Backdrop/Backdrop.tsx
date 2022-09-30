import classes from './Backdrop.module.css';

export const Backdrop = ({ onClick }: { onClick: () => void }) => (
    <div className={`${classes["backdrop"]} ${classes["dark-background"]}`} onClick={onClick}></div>
);