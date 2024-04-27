import React from "react";
import css from "./AvaliableHoursList.module.css";

const AvaliableHoursList = ({ avaliableHours, register, errors }) => {
  return (
    <div className={css.avaliableHoursContainer}>
      <h3>
        {avaliableHours.length === 0
          ? new Date().toLocaleDateString("uk-UA", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })
          : new Date(avaliableHours[0].start).toLocaleDateString("uk-UA", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
      </h3>

      <div className={css.avaliableHoursRadiosContainer}>
        {avaliableHours.length === 0 ? (
          <p>No avaliable time for this day...</p>
        ) : (
          avaliableHours.map((time) => {
            return (
                
                <label className={css.radioItem} key={time.start}>
                  <input
                    type="radio"
                    name="time"
                    value={time.start}
                    {...register("time", {
                      required: "Please choose a time",
                    })}
                  />
                  {new Date(time.start).toLocaleTimeString().slice(0, -3)}
                </label>
            );
          })
        )}
        {errors.time && <p className={css.error}>{errors.time.message}</p>}
      </div>
    </div>
  );
};

export default AvaliableHoursList;
