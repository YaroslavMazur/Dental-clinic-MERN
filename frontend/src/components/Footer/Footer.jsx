import React from "react";
import css from "./Footer.module.css";

export const Footer = () => {


    return(
        <footer className={css.footerContainer}>
            <div className={css.column}>
                <h3>Contact info</h3>
            </div>
            <div className={css.column}>
                <h3>Pages</h3>

            </div>
            <div className={css.column}>
                <h3>Location</h3>

            </div>
            <div className={css.column}>
                <h3>Block 4</h3>

            </div>
        </footer>
    )
}