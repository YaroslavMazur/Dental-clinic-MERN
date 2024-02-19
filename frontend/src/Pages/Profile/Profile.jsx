import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserData, logoutUser, selectIsAuth } from "../../redux/slices/authSlice";
import css from "./Profile.module.css";
import UserService from "../../services/userService";
import AppointmantsList from "../../components/AppointmantsList/AppointmantsList";

export const Profile = ()=>{
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth);
    const userDataRedux = useSelector(selectUserData);

    const [user, setUser] = useState({});

    
    useEffect(() => {
        const fetchData = async () => {
          try {
            if (!isAuth) {
              alert("Please login");
              navigate("/login");
            } else if (!!userDataRedux) {

            const { data } = await UserService.fetchUser(userDataRedux.id);
              setUser(data);
            }
            console.log(user);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchData(); 
    
      }, []);

    const handleLogout = ()=>{
        dispatch(logoutUser());

        navigate("/");
        
    }
    return(

        <div className={css.profileContainer}>
            <div className={css.profileInfo}>
                <img src="./portrait.png"/>
                <h2>{user.fullName}</h2>
                <p>{user.email}</p>
                <p>{user.phoneNumber}</p>
                <button onClick={handleLogout} className={css.btn}>Logout</button> 
            </div>
            <AppointmantsList userId={userDataRedux.id}/>
        </div>
    )
}