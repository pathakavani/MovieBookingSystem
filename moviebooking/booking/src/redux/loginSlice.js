import {createSlice} from '@reduxjs/toolkit';


const loginUser = createSlice({
    name: "loginSlice",
    initialState: {
        email:"",
        admin: false
    },
    reducers: {
        setAdmin(state, action) {
            state.admin = action.payload;
        },
        setEmail(state, action) {
            state.email = action.payload;
        }
    }
})

export const loginActions = loginUser.actions;

export default loginUser;