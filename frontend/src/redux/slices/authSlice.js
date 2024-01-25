import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/authService";

export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await AuthService.registration(
            userData.email,
            userData.password,
            userData.phoneNumber,
            userData.fullName,
        );

        localStorage.setItem("token", response.data.accessToken);
        return response.data;

    }  catch (error) {
        console.log(error)
        throw rejectWithValue(error.response.data);      
    }
    }
);

const initialState = {
    isAuth: null,
    userData: null,
    // errors:null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuth = true;
            state.userData = action.payload;
        },

        logout: (state) => {
            state.isAuth = null;
            state.userData = null;
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.userData = null;
                state.isAuth = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.isAuth = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.userData = null;
                state.isAuth = null;

                console.log("action",action);
                // state.errors = action.payload.errors;


            });
    },

})
export const selectIsAuth = (state) => Boolean(state.isAuth);
export const selectErrors = (state) => state.errors;


export const authReducer = authSlice.reducer;

export const { login, logout } = authSlice.actions;