// chatReducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chatRoom: null,
    chatUpdate: true,
    userListUpdate: true,
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        openChat: (state, action) => {
            // console.log(action.payload) //test
            state.chatRoom = action.payload;

        },
        closeChat: (state) => {
            state.chatRoom = null;
        },
        chatsUpdate: (state) => {
            state.chatUpdate = state.chatUpdate === true ? false : true;
        },
        usersListUpdate: (state) => {
            state.userListUpdate = state.userListUpdate === true ? false : true;
        },
    }
})

export const { openChat, closeChat, chatsUpdate, usersListUpdate } = chatSlice.actions
export default chatSlice.reducer