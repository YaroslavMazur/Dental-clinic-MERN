import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { appointmantReducer } from "./slices/appointmantSlice";

const store = configureStore({
    reducer:{
        auth:authReducer,
        appointmant:appointmantReducer,
    },
})

export default store;