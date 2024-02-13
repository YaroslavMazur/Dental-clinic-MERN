import React from 'react';
import { useForm } from 'react-hook-form';
import css from "./Login.module.css";
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  const onSubmit = async (data) => {

    const response = await dispatch(loginUser(data));
    console.log("login resp", response);

    const isValidated = !response.payload?.errors;
    console.log(isValidated);

    if (!isValidated) {
      response.payload.errors.forEach((err) => {
        setError(err.path, { type: "manual", message: err.msg });
      });

    }
    else{
      navigate("/");
    }

  };

  return (
        <div className={css.formContainer}>
            

          <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
              <h2>Login</h2>
              
              <div className={css.inputContainer}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder='email'
                    {...register('email', { required: '*Email is required' })}
                />
                {errors.email && <p className={css.error}>{errors.email.message}</p>}
              </div>

              <div className={css.inputContainer}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder='password'
                    {...register('password', { required: '*Password is required' })}
                />
                {errors.password && <p className={css.error}>{errors.password.message}</p>}
              </div>

              <button type="submit">Log In</button>
              <GoogleLogin/>
          </form>
        </div>
  );
};

export default Login;