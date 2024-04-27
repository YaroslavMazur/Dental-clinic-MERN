import react from "react";
import AppointmentForm from "../../components/AppointmentForm/AppointmentForm";
import css from "./AppointmentPage.module.css";

const AppointmentPage = ()=>{
    

    
    return(
        <div className={css.container}>

            <AppointmentForm/>
            
        </div>
    )
}

export default AppointmentPage;