import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/slices/authSlice.js";
import UserService from "../../services/userService.js";
import AppointmentService from "../../services/appointmentService.js";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import css from "./AppointmentForm.module.css";
import {
  addNewAppointment,
  getAvaliableHours,
  selectErrors,
  selectIsLoading,
} from "../../redux/slices/appointmentSlice";

import AvaliableHoursList from "./AvaliableHoursList/AvaliableHoursList.jsx";
import { useNavigate } from "react-router-dom";

const AppointmentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector(selectUserData);
  const errorRedux = useSelector(selectErrors);
  const isLoading = useSelector(selectIsLoading);


  const [doctors, setDoctors] = useState([]);
  const [avaliableHours, setAvaliableHours] = useState([]);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await UserService.fetchAllDoctors();
        setDoctors(response.data);
        console.log(response);
        console.log("doctors", doctors);
        updateAvaliableHours(new Date(), response.data[0].id); // Змінено doctors на response.data
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctors();
  }, []);

  const updateAvaliableHours = async (date, doctorId) => {
    const response = await dispatch(
      getAvaliableHours({
        date,
        doctorId,
      })
    );

    setAvaliableHours(response.payload);
  };

  const onSubmit = async (data) => {
    data.userId = user.id;
    const response = await dispatch(addNewAppointment(data));

    if(!errorRedux && !isLoading){
      console.log(errorRedux)
      window.alert("New appointment successfully created!");
      navigate("/profile");
    }
  };

  const handleChangeDate = async (date) => {
    setValue("date", date);
    const { doctorId } = getValues();

    await updateAvaliableHours(date, doctorId);
  };

  console.log()
  return (
    <div className={css.formsContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <h2>Make an appointment</h2>

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
          <label htmlFor="doctorId">Choose a doctor</label>

          {doctors.length === 0 ? (
            <p>Loaging</p>
          ) : (
            doctors.map((doctor, index) => {
              return (
                <label key={doctor.id}>
                  <input
                    checked={index === 0 ? true : false}
                    type="radio"
                    name="doctorId"
                    value={doctor.id}
                    {...register("doctorId", {
                      required: "*Please choose a doctor",
                    })}
                  />
                  {doctor.fullName}
                </label>
              );
            })
          )}
          {errors.doctorId && (
            <p className={css.error}>{errors.doctorId.message}</p>
          )}
        </div>

        <div className={css.inputContainer}>
          <label htmlFor="date">Date</label>
          <Calendar
            className="react-calendar"
            type="date"
            id="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            minDate={new Date()}
            {...register("date", { required: "*Date is required" })}
            onChange={(date) => handleChangeDate(date)}
          />
          {errors.date && <p className={css.error}>{errors.date.message}</p>}
        </div>

        <AvaliableHoursList
          avaliableHours={avaliableHours}
          register={register}
          errors={errors}
        />

        <button type="submit">Make an appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
