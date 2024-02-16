import { message } from "./chatType";

export interface PushNotification {
    data: message
}

export interface notify {
    sender: string,
    content: string,
    dp?: string,
    senderId?:string
}