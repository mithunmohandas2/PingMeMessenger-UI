import { useSelector } from "react-redux"
import { ReduxStateType } from "../types/reduxTypes"
import { useEffect, useState } from "react"
import { getMessagesAPI } from "../services/interactionsAPI"
import { message } from "../types/chatType"

function ChatBox() {
    const chats = useSelector((state: ReduxStateType) => state.chat.chatRoom)
    const [messages, setMessages] = useState([])
    const senderId = useSelector((state: ReduxStateType) => state.user.userData?._id)

    useEffect(() => {
        if (chats?._id) {
            (async () => {
                const { data } = await getMessagesAPI(chats?._id!)
                console.log(data) //test
                setMessages(data)
            })()
        }
    }, [chats])

    return (
        <div className="p-4 mb-12">
            {chats ? <>
                {messages ? (messages?.length ?
                    <> {messages.map((message: message) => (
                        <div key={message._id}>
                            {message.sender._id === senderId ?
                                //  sent messages
                                <div className="mb-4">
                                    <div className="flex justify-end">
                                        <div className="bg-blue-500 text-white p-2 rounded-lg rounded-r-none">{message.content}</div>
                                        <img className="bg-blue-500 w-10 h-10 p-2 rounded-lg rounded-l-none" src={message.sender.image} />
                                    </div>
                                </div>
                                :
                                //recieved message
                                <div className="mb-4">
                                    <div className="flex justify-start">
                                        <img className="bg-gray-300 w-10 h-10 p-2 rounded-lg rounded-r-none" src={message.sender.image} />
                                        <div className="bg-gray-300 p-2 rounded-lg rounded-l-none">{message.content}</div>
                                    </div>
                                </div>

                            }
                        </div>
                    ))}
                    </>
                    : null) : null}
            </> : <div className="text-center">
                Click a chat to view messages
            </div>}
        </div>
    )
}

export default ChatBox