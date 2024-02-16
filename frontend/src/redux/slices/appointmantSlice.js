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


    },

})
export const selectIsLoading = (state) => Boolean(state.auth.isLoading);


export const appointmantReducer = appointmantSlice.reducer;

