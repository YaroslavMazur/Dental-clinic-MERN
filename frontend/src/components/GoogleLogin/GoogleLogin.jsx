import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { googleAuth } from "../../redux/slices/authSlice";
import axios from "axios";
import css from "./GoogleLogin.module.css";

const GoogleLogin = () => {


  return(
    <a href="http://localhost:5000/api/auth/google" className={css.containerHref}>
      <img src="./Google_logo.svg"/>
      <p>Continue with google</p>
    </a>
  )
};

export default GoogleLogin;
