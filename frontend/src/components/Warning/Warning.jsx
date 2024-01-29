import React from "react";
import css from "./Warning.module.css";
import {Link} from "react-router-dom"

export const Warning = ({msg, link}) =>{

    return(
        <div className={css.warnContainer}>
            <Link className = {css.warnText}to={link}>{msg}</Link>
        </div>
    )

}