import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/authService";
import axios from "axios";
import { API_URL } from "../../http";
import AppointmentService from "../../services/appointmentService";

export const addNewAppointment = createAsyncThunk("appointments/addNew", async (data, { rejectWithValue }) => {
    try {
        const response = await AppointmentService.addNewAppointment(data);

        return response.data;

    } catch (error) {
        console.log(error)
        throw rejectWithValue(error.response.data);
    }
}
);

export const getAvaliableHours = createAsyncThunk("appointments/getAvaliableHours", async (data, { rejectWithValue }) => {
    try {

        console.log("data", data);
        const response = await AppointmentService.getAvaliableHours(data.doctorId, data.date);

        return response.data;

    } catch (error) {
        console.log(error)
        throw rejectWithValue(error.response.error);
    }
}
);

export const getAllAppointments = createAsyncThunk("appointments/getAllAppointments", async (userId, { rejectWithValue }) => {
    try {

        console.log("userId", userId);
        const response = await AppointmentService.getAllAppointments(userId);

        return response.data;

    } catch (error) {
        console.log(error)
        throw rejectWithValue(error.response.error);
    }
}
);


const initialState = {
    isLoading:false,
    error: null,
}

const appointmentSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewAppointment.pending, (state) => {
                state.isLoading = true;
                state.error = null; 

            })
            .addCase(addNewAppointment.fulfilled, (state, action) => {
                console.log("payload", action.payload);
                state.isLoading = false;
                state.error = null;

            })
            .addCase(addNewAppointment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(getAvaliableHours.pending, (state) => {
                state.isLoading = true;
                state.error = null; 

            })
            .addCase(getAvaliableHours.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;

            })
            .addCase(getAvaliableHours.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(getAllAppointments.pending, (state) => {
                state.isLoading = true;
                state.error = null; 

            })
            .addCase(getAllAppointments.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;

            })
            .addCase(getAllAppointments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })


    },

})
export const selectIsLoading = (state) => Boolean(state.appointments.isLoading);
export const selectErrors = (state) => state.appointments.error;

export const selectAppointmentsState = (state)=> state.appointments;



export const appointmentReducer = appointmentSlice.reducer;

