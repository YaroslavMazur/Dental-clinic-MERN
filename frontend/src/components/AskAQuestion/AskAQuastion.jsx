import React from "react";
import css from "./AskAQuastion.module.css"
import {useForm} from "react-hook-form"
import UserService from "../../services/userService";


const AskAQuastion = ()=>{

    const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {

    try{
        await UserService.sendQuestion(data);
        window.alert("Питяння було відправлено успішно")

    }catch(err){
        
        console.log(err);
    }
    console.log(data);
  };

  return (
    <div className={css.AskAQuastionContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
      
          <input
            type="text"
            placeholder="Name:"
            {...register('name', { required: true })} />
          {errors.name && <span className={css.error}>This field is required</span>}

          <input 
            placeholder="Email:"
            type="email" {...register('email', { required: true })} />
          {errors.email && <span className={css.error}>This field is required</span>}

            
          <textarea
            placeholder="Ask a question:"

            {...register('question', { required: true })} />
          {errors.question && <span className={css.error}>This field is required</span>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AskAQuastion;