import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserData, logoutUser, selectIsAuth } from "../../redux/slices/authSlice";

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

        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}