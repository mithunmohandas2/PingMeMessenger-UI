import { User } from "./userTypes";

export interface chat {
    _id?: string,
    chatName: string,
    groupAdmin: User,
    isGroup: boolean,
    users: User[],
    createdAt: string,
    updatedAt: string,
}

export interface message {
    _id: string,
    chat: chat,
    content: string,
    sender: User,
}

export interface ChatTypeRedux {
    chatRoom: null | chat,
    chatUpdate: boolean
}
