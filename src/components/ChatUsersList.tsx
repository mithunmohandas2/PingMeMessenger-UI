import { useDispatch, useSelector } from "react-redux"
import { ReduxStateType } from "../types/reduxTypes"
import { useEffect, useState } from "react"
import { getChatsAPI } from "../services/interactionsAPI"
import { useNavigate } from "react-router-dom"
import { openChat } from "../features/chat/chatSlice"
import { chat } from "../types/chatType"
import JoinChatRoom from "./JoinChatRoom"

function ChatUsersList() {
  const selectedChatId = useSelector((state: ReduxStateType) => state.chat.chatRoom?._id)
  const chatListUpdate = useSelector((state: ReduxStateType) => state.chat.userListUpdate)
  const chatUpdate = useSelector((state: ReduxStateType) => state.chat.chatUpdate)
  const loggedUserID: string = useSelector((state: ReduxStateType) => state.user.userData?._id)!
  const [chats, setChats] = useState([])
  const Navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchChats = async () => {
    const response = await getChatsAPI()
    // console.log(response) //test purpose
    if (response?.data) setChats(response.data)
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) Navigate('/unauthorized')
    fetchChats()
  }, [chatListUpdate, chatUpdate])

  return (
    <>
      <ul className="p-4 pb-20">

        {/* New chat room join & add users */}
        <JoinChatRoom />

        {chats ? (chats?.length ? chats.map((chat: chat) => (
          //on click chat redux gets updated with chat
          <li key={chat?._id}
            className={selectedChatId === chat?._id ? "mb-2 p-2 bg-blue-200 rounded-lg" :
              "mb-2 p-2 bg-white hover:bg-gray-50 rounded-lg cursor-pointer"}
            onClick={() => { dispatch(openChat(chat)) }}>
            {chat?.isGroup ?
              <div className="flex">
                <img src="https://www.mydemy.co/wp-content/plugins/buddyboss-platform/bp-core/images/group-avatar-legacy.png" className="w-full sm:w-9 sm:h-9 me-2 rounded-lg" alt="logo" />
                <div className="hidden sm:block">{chat.chatName}</div>
              </div>
              :
              <div className="flex">
                <img src={chat.users[0]._id === loggedUserID ? chat.users[1].image : chat.users[0].image} className="w-full sm:w-9 sm:h-9 me-2 rounded-lg" alt="logo" />
                <div className="hidden sm:block" >{chat.users[0]._id === loggedUserID ? chat.users[1].name : chat.users[0].name}</div>
              </div>
            }

          </li>
        )) : null) : null}
      </ul>
    </>
  )
}

export default ChatUsersList