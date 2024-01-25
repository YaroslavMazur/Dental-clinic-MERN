import React, { useEffect } from "react";
import { useForm, setValue } from "react-hook-form";
import css from "../Login/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  selectErrors,
  selectIsAuth,
} from "../../redux/slices/authSlice";

export const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

      const resultAction = await dispatch(

        registerUser({
          email: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
          fullName: data.fullName,
        })
      );
      
      const isValidated = !resultAction.payload?.errors;

      if(!isValidated){
        resultAction.payload.errors.forEach((err)=>{
          setError(err.path, { type:"server validation", message:err.msg })
        })
      }
      else{
        navigate("/");
      }
      
  };

  return (
    <div className={css.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <h2>Registration</h2>

        <div className={css.inputContainer}>
          <label htmlFor="fullName">Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="name"
            {...register("fullName", { required: "*name is required" })}
          />
          {errors.fullName && (
            <p className={css.error}>{errors.fullName.message}</p>
          )}
        </div>

        <div className={css.inputContainer}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="email"
            {...register("email", { required: "*email is required" })}
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>

        <div className={css.inputContainer}>
          <label htmlFor="phoneNumber">Phone number</label>

          <PhoneInputWithCountry
            id="phoneNumber" // Add an id for accessibility
            name="phoneNumber" // Add name prop for registration
            defaultCountry="UA"
            control={control}
            rules={{ required: "*phone number is required" }}          />
          {errors.phoneNumber && (
            <p className={css.error}>{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className={css.inputContainer}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            {...register("password", { required: "*password is required" })}
          />
          {errors.password && (
            <p className={css.error}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};
