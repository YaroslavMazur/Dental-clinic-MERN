import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import UserService from "../../services/userService";
import css from "./AppointmantForm.module.css";

const AppointmantForm = () => {
  const [form1Data, setForm1Data] = useState({});
  const [form2Data, setForm2Data] = useState({});
  const [formStage, setFormStage] = useState(1);

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
        console.log(response);
        setDoctors(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctors();
  }, []);

  const onSubmitForm1 = (data) => {
    setForm1Data(data);
    console.log(form1Data);
    if (isValid) {
      setFormStage(2);
    }
  };

  const onSubmitForm2 = (data) => {
    setForm2Data(data);

    const formsData = {...form1Data, ...form2Data};

    console.log(formsData)
  };

  const handleChangeData = (e)=>{
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
            <label htmlFor="description">description</label>

            {doctors.map((doctor) => {
              return (
                <label>
                  <input
                    type="radio"
                    name="doctorRadioOption"
                    value={doctor.id}
                    {...register("doctorRadioOption", {
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

          <div className={css.inputContainer}>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              placeholder="date"
              min={new Date().toISOString().split("T")[0]}
              {...register("date", { required: "*Date is required" })}
              onChange={handleChangeData}
            />
            {errors.date && <p className={css.error}>{errors.date.message}</p>}
          </div>
          <p className="p">{form1Data.date}</p>

          <button type="submit">Make an appointmant</button>
        </form>
      )}
    </div>
  );
};

export default AppointmantForm;
