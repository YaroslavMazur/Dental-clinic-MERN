import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/slices/authSlice";
import UserService from "../../services/userService";
import AppointmantService from "../../services/appointmantService";

import css from "./AppointmantForm.module.css";
import { addNewAppointmant } from "../../redux/slices/appointmantSlice";


const AppointmantForm = () => {

  const dispatch = useDispatch();
  const [formStage, setFormStage] = useState(1);
  const user = useSelector(selectUserData)

  const [doctors, setDoctors] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await UserService.fetchAllDoctors();
        setDoctors(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctors();
  }, []);

  const onSubmitForm1 = (data) => {

    if (isValid) {
      setFormStage(2);
    }
  };

  const onSubmitForm2 = async (data) => {


    const {doctorRadioOption, ...formData} = data;


    const doctor = JSON.parse(doctorRadioOption);

    const appointmantData = {...formData, user, doctor};
    console.log(appointmantData)

    const response = await dispatch(addNewAppointmant(appointmantData))



    console.log(appointmantData);
  };

  const handleChangeDate = (e)=>{
    console.log(e.target.value);

  }

  return (
    <div className={css.formsContainer}>
      {formStage === 1 && (
        <form onSubmit={handleSubmit(onSubmitForm1)} className={css.form}>
          <h2>Make an appointmant 1 of 2</h2>

          <div className={css.inputContainer}>
            <label htmlFor="description">description</label>
            <input
              type="text"
              id="description"
              placeholder="description"
              {...register("description")}
            />
            {errors.date && <p className={css.error}>{errors.date.message}</p>}
          </div>

          <div className={css.inputContainer}>
            <label htmlFor="doctorRadioOption">Choose a doctor</label>

            {doctors.map((doctor) => {
              return (
                <label key={doctor.id}>
                  <input
                    type="radio"
                    name="doctorRadioOption"
                    value={JSON.stringify(doctor)}
                    {...register("doctorRadioOption", {
                      required: "Please choose a doctor",
                    })}

                    onChange={handleChangeDate}
                  />
                  {doctor.name}
                </label>
              );
            })}
            {errors.doctorRadioOption && (
              <p className={css.error}>{errors.doctorRadioOption.message}</p>
            )}
          </div>

          <button type="submit">Continue</button>
        </form>
      )}
      {formStage === 2 && (
        <form onSubmit={handleSubmit(onSubmitForm2)} className={css.form}>
          <h2>Make an appointmant 2 of 2</h2>
          <button onClick={() => setFormStage(1)}>Back</button>

          <div className={css.inputContainer} >
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              min={new Date().toISOString().split("T")[0]}
              {...register("date", { required: "*Date is required" })}
              onChange={handleChangeDate}
            />
            {errors.date && <p className={css.error}>{errors.date.message}</p>}
          </div>

          <button type="submit">Make an appointmant</button>
        </form>
      )}
    </div>
  );
};

export default AppointmantForm;
