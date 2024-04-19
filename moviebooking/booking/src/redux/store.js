import { configureStore } from "@reduxjs/toolkit";
import loginUser from "./loginSlice";

const store = configureStore({
    reducer: {
        login: loginUser.reducer
    } 
})

export default store;