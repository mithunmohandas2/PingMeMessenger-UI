import { User } from "./userTypes";

export interface chat {
    _id?: string,
    chatName: string,
    groupAdmin: User,
    isGroup: boolean,
    users: User[],
    createdAt: Date,
    updatedAt: Date,
}


