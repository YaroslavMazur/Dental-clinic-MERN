import React, { useEffect, useState } from "react";
import css from "./AppointmentsList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAppointments,
  selectAppointmentsState,
  selectIsLoading,
} from "../../redux/slices/appointmentSlice";
import Loader from "../Loader/Loader";

//ЗМІНИТИ appointman на appointment

const AppointmentsList = ({ userId }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await dispatch(getAllAppointments(userId));
        console.log(response);
        setAppointments(response.payload);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppointments();
    console.log(appointments);
  }, []);

  const currentDate = new Date();

  return (
    <div className={css.appointmentsContainer}>
      <h2>Future Appointments</h2>
      {isLoading ? (
        <Loader/>
      ) : (
        appointments.map((appointment) => {
          if (new Date(appointment.appointmenDate) > currentDate) {
            return (
              <div className={css.appointmentItem} key={appointment._id}>
                <p>{appointment.userId.fullName}</p>
                <p>
                  {new Date(appointment.appointmenDate).toLocaleDateString(
                    "uk-UA",
                    {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }
                  )}
                </p>
              </div>
            );
          }
        })
      )}

      <h2>Past Appointments</h2>
      {isLoading ? (
        <Loader/>
      ) : (
        appointments.map((appointment) => {
          if (new Date(appointment.appointmenDate) <= currentDate) {
            return (
              <div className={css.appointmentItem} key={appointment._id}>
                <p>{appointment.userId.fullName}</p>
                <p>
                  {new Date(appointment.appointmenDate).toLocaleDateString("uk-UA", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
              </div>
            );
          }
        })
      )}
    </div>
  );
};

export default AppointmentsList;
