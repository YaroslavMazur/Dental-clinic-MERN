import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/authService";
import axios from "axios";
import { API_URL } from "../../http";

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

export const loginUser = createAsyncThunk("auth/loginUser", async (userData, {rejectWithValue}) => {
    try {
        const response = await AuthService.login(
            userData.email,
            userData.password,
        );

        localStorage.setItem("token", response.data.accessToken);
        return response.data;

    }  catch (error) {
        console.log(error);
        throw rejectWithValue(error.response.data);      

    }
    }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async (userData, {rejectWithValue}) => {
    try {
        const response = await AuthService.logout()

        localStorage.removeItem("token");
        return response.data;

    }  catch (error) {

        console.log("login ERROR", error);
        throw rejectWithValue(error.response.data);      

    }
    }
);

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
    try {
        const response = await axios.get(`${API_URL}/refresh`, {withCredentials:true});
        localStorage.setItem("token", response.data.accessToken);

        return response.data;

    }  catch (error) {

        console.log("checkauth ERROR", error);

    }
    }
);

const initialState = {
    isAuth: null,
    userData: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
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
            .addCase(registerUser.rejected, (state) => {
                state.userData = null;
                state.isAuth = null;
            })

            .addCase(loginUser.pending, (state) => {
                state.userData = null;
                state.isAuth = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.isAuth = true;
            })
            .addCase(loginUser.rejected, (state) => {
                state.userData = null;
                state.isAuth = null;
            })

            .addCase(logoutUser.pending, (state) => {
                state.userData = null;
                state.isAuth = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.userData = null;
                state.isAuth = false;
            })
            .addCase(logoutUser.rejected, (state) => {
                state.userData = null;
                state.isAuth = null;
            })
            .addCase(checkAuth.pending, (state) => {
                state.userData = null;
                state.isAuth = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.isAuth = true;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.userData = null;
                state.isAuth = null;
            });
    },

})
export const selectIsAuth = (state) => Boolean(state.auth.isAuth);
export const selectIsMailActivated = (state) => {
    const userData = state.auth.userData;
    if(!userData) return false;

    return userData.user.isActivated;
}

export const selectUserData = (state) => state.auth.userData;


export const authReducer = authSlice.reducer;

export const { login, logout } = authSlice.actions;