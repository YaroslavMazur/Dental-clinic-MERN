import React from 'react';
import { useForm ,setValue} from 'react-hook-form';
import css from "../Login/Login.module.css";
import {Link} from 'react-router-dom';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import 'react-phone-number-input/style.css';


export const Registration = () => {
  const { register, handleSubmit,control, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('name:', data.name);
    console.log('email:', data.email);
    console.log('Number:', data.phoneNumber);
    console.log('Password:', data.password);


  };

  return (
        <div className={css.formContainer}>
            

          <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
              <h2>Registration</h2>
              
              <div className={css.inputContainer}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder='name'
                    {...register('name', { required: '*name is required'})}
                />
                {errors.name && <p className={css.error}>{errors.name.message}</p>}
              </div>

              <div className={css.inputContainer}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder='email'
                    {...register('email', { required: '*email is required' })}
                />
                {errors.email && <p className={css.error}>{errors.email.message}</p>}
              </div>

              <div className={css.inputContainer}>
              <label htmlFor="phoneNumber">Phone number</label>
              
              <PhoneInputWithCountry 
                  id="phoneNumber"  // Add an id for accessibility
                  name="phoneNumber"  // Add name prop for registration
                  defaultCountry="UA"
                  control={control}
                  // {...register('phoneNumber', { required: 'Phone number is required' })}
              />
                {errors.phoneNumber && <p className={css.error}>{errors.phoneNumber.message}</p>}

              </div>

              <div className={css.inputContainer}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder='password'
                    {...register('password', { required: '*password is required' })}
                />
                {errors.password && <p className={css.error}>{errors.password.message}</p>}
              </div>

              <button type="submit">Sign up</button>
          </form>
        </div>
  );
};
