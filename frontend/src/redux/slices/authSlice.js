import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/authService";

export const registerUser = createAsyncThunk("auth/registerUser", async (userData) => {
    try{
        const response = await AuthService.registration(
            userData.email,
            userData.password,
            userData.phoneNumber,
            userData.fullName,
        )

        localStorage.setItem("token", response.data.accessToken);
    }catch(err){
        return console.log(err);
    }

    return response.data;
})

const initialState = {
    isAuth: null,
    userData: null,
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
                state.isRegistered = true;
            })
            .addCase(registerUser.rejected, (state) => {
                state.userData = null;
                state.isAuth = null;
            });
    },

})
export const selectIsAuth = (state) => Boolean(state.isAuth);

export const authReducer = authSlice.reducer;

export const { login, logout } = authSlice.actions;