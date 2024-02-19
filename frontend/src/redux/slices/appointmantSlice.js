import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/authService";
import axios from "axios";
import { API_URL } from "../../http";
import AppointmantService from "../../services/appointmantService";

export const addNewAppointmant = createAsyncThunk("appointmant/addNew", async (data, { rejectWithValue }) => {
    try {
        const response = await AppointmantService.addNewAppointmant(data);

        return response.data;

    } catch (error) {
        console.log(error)
        throw rejectWithValue(error.response.data);
    }
}
);

export const getAvaliableHours = createAsyncThunk("appointmant/getAvaliableHours", async (data, { rejectWithValue }) => {
    try {

        console.log("data", data);
        const response = await AppointmantService.getAvaliableHours(data.doctorId, data.date);

        return response.data;

    } catch (error) {
        console.log(error)
        throw rejectWithValue(error.response.error);
    }
}
);

export const getAllAppointmants = createAsyncThunk("appointmant/getAllAppointmants", async (userId, { rejectWithValue }) => {
    try {

        console.log("userId", userId);
        const response = await AppointmantService.getAllAppointmants(userId);

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

const appointmantSlice = createSlice({
    name: "appointmant",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewAppointmant.pending, (state) => {
                state.isLoading = true;
                state.error = null; 

            })
            .addCase(addNewAppointmant.fulfilled, (state, action) => {
                console.log("payload", action.payload);
                state.isLoading = false;
                state.error = null;

            })
            .addCase(addNewAppointmant.rejected, (state, action) => {
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

            .addCase(getAllAppointmants.pending, (state) => {
                state.isLoading = true;
                state.error = null; 

            })
            .addCase(getAllAppointmants.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;

            })
            .addCase(getAllAppointmants.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })


    },

})
export const selectIsLoading = (state) => Boolean(state.appointmant.isLoading);


export const appointmantReducer = appointmantSlice.reducer;

