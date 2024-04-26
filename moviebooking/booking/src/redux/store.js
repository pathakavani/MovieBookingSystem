import { configureStore } from "@reduxjs/toolkit";
import loginUser from "./loginSlice";
import currentMovie from "./currentMovie";

const store = configureStore({
    reducer: {
        login: loginUser.reducer,
        cmovie: currentMovie.reducer
    } 
})

export default store;