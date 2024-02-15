import { ChatTypeRedux } from "./chatType";
import { UserTypeRedux } from "./userTypes";

export interface ReduxStateType {
    user: UserTypeRedux,
    chat: ChatTypeRedux,
}