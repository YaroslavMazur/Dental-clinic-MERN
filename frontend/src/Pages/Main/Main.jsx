import react from "react";
import css from "./Main.module.css";

export const Main = ()=>{

    return(
        <div className={css.mainContainer}>
            <h1 className={css.staticText}>Text:</h1>
            <h1 className={css.dynamicText}>dynamic text</h1>
        </div>
    )
}