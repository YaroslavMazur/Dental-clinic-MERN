  import React, { useEffect, useState } from "react";
  import { useForm } from "react-hook-form";
  import { useDispatch, useSelector } from "react-redux";
  import { selectUserData } from "../../redux/slices/authSlice";
  import UserService from "../../services/userService";
  import AppointmantService from "../../services/appointmantService";

  import css from "./AppointmantForm.module.css";
  import { addNewAppointmant, getAvaliableHours } from "../../redux/slices/appointmantSlice";


  

  const AppointmantForm = () => {

    const dispatch = useDispatch();
    const [formStage, setFormStage] = useState(1);
    const user = useSelector(selectUserData)

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
        } catch (error) {
          console.error(error);
        }
      };
      fetchDoctors();
    }, []);

    const updateAvaliableHours = async(date, doctorId)=>{
      const response = await dispatch(getAvaliableHours({
        date, doctorId
      }));

      setAvaliableHours(response.payload);
    }

    const onSubmitForm1 = async (data) => {

      if (isValid) {

        await updateAvaliableHours(new Date(), data.doctorId);

        setFormStage(2);
      }
    };

    const onSubmitForm2 = async (data) => {

      data.userId = user.id;     
      const response = await dispatch(addNewAppointmant(data))

    };

    const handleChangeDate = async (e) =>{
      const newValue = e.target.value;
      setValue("date", newValue);
      const {date, doctorId} = getValues();
      console.log(date);
      await updateAvaliableHours(date, doctorId);


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
              <label htmlFor="doctorId">Choose a doctor</label>

              {doctors.length === 0? (<p>Loaging</p>):
              
              doctors.map((doctor) => {
                return (
                  <label key={doctor.id}>
                    <input
                      type="radio"
                      name="doctorId"
                      value={doctor.id}
                      {...register("doctorId", {
                        required: "Please choose a doctor",
                      })}

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
                defaultValue={new Date().toISOString().split("T")[0]}
                min={new Date().toISOString().split("T")[0]}
                {...register("date", { required: "*Date is required" })}
                onChange={(e)=> {handleChangeDate(e)}}
              />
              {errors.date && <p className={css.error}>{errors.date.message}</p>}
            </div>

            {avaliableHours.length === 0?
            <p>No avaliable time for this day...</p>
            :
            avaliableHours.map((time) => {
                return (
                  <label key={time.start}>
                    <input
                      type="radio"
                      name="time"
                      value={time.start}
                      {...register("time", {
                        required: "Please choose a time",
                      })}
                    />
                    {new Date(time.start).toLocaleTimeString().slice(0, -3)} - {new Date(time.end).toLocaleTimeString().slice(0, -3)}
                  </label>
                );
              })}
              {errors.time && (
                <p className={css.error}>{errors.time.message}</p>
              )}

            <button type="submit">Make an appointmant</button>
          </form>
        )}
      </div>
    );
  };

  export default AppointmantForm;
