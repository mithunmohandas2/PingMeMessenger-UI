import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData : null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            // console.log(action.payload) //test
            state.userData = action.payload;

            // Save in local storage
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('name', action.payload.name);
            localStorage.setItem('_id', action.payload._id);
            localStorage.setItem('email', action.payload.email);
        },
        logout: (state) => {
            // Clear all data in local storage & redux state
            state.userData = null;
            localStorage.clear();
        },
    }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer