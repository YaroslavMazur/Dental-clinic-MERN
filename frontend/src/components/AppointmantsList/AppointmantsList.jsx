import React, { useEffect, useState } from "react";
import css from "./AppointmantsList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAppointmants,
  selectIsLoading,
} from "../../redux/slices/appointmantSlice";

const AppointmantsList = ({ userId }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  console.log("APP user", userId);
  const [appointmants, setAppointmants] = useState([]);

  useEffect(() => {
    const fetchAppointmants = async () => {
      try {
        const response = await dispatch(getAllAppointmants(userId));
        console.log(response);
        setAppointmants(response.payload);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppointmants();
  },[]);

  return (
    <div className={css.appointmantsContainer}>
      {isLoading ? (
        <p>Loading...</p>
      ) :appointmants && appointmants.length === 0 ? (
        <p>No appointmants yet</p>
      ) : (
        appointmants.map((appointmant) => {
          return (
            <div className={css.appointmantItem} key={appointmant._id}>
              <p>{appointmant.userId.fullName}</p>
              <p>{new Date(appointmant.appointmenDate).toLocaleDateString("uk-UA", { weekday: 'long', month: 'long', day: 'numeric',hour:"numeric",minute:"numeric"})}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AppointmantsList;
