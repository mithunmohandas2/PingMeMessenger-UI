// chatReducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chatRoom: null,
    chatUpdate: true,
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
        update: (state) => {
            state.chatUpdate = state.chatUpdate === true ? false : true;
        },
    }
})

export const { openChat, closeChat, update } = chatSlice.actions
export default chatSlice.reducer