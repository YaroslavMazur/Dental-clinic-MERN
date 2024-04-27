import React from 'react';
import css from "./Error.module.css";

const Error = ({text, type}) => {


    return (
        <div className={css.errorContainer}>
            <h3>Помилка</h3>
            <p>{text}</p>
        </div>
    );
}

export default Error;
