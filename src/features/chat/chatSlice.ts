// chatReducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chatRoom : null,
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
    }
})

export const { openChat, closeChat } = chatSlice.actions
export default chatSlice.reducer