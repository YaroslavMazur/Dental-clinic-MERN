import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserData, logoutUser, selectIsAuth } from "../../redux/slices/authSlice";
import css from "./Profile.module.css";

export const Profile = ()=>{
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth);
    
    useEffect(()=>{
        if(!isAuth){
            alert("Please login");
            navigate("/login");
        }
    },[])

    const handleLogout = ()=>{
        dispatch(logoutUser());

        navigate("/");
        
    }
    return(

        <div className={css.profileContainer}>
            <div className={css.profileInfo}>
                <img src="./portrait.png"/>
                <h2>Mazur Yaroslav</h2>

                <button onClick={handleLogout}>Logout</button> 
            </div>

            <div className={css.ordersContainer}>

            </div>
        </div>
    )
}