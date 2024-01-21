import React from 'react';
import { useForm } from 'react-hook-form';
import css from "./Login.module.css";
import {Link} from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Ваша логіка обробки логіну тут, наприклад, виклик API для перевірки логіну та паролю
    console.log('Email:', data.email);
    console.log('Password:', data.password);
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
          </form>
        </div>
  );
};

export default Login;