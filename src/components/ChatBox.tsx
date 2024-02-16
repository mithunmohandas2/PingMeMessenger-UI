import { useDispatch, useSelector } from "react-redux"
import { ReduxStateType } from "../types/reduxTypes"
import { useEffect, useRef, useState } from "react"
import { getMessagesAPI } from "../services/interactionsAPI"
import { message } from "../types/chatType"
import Pusher from 'pusher-js'
import { PushNotification, notify } from "../types/pushNotificationType"
import Notification from "./Notification"
import { chatsUpdate } from "../features/chat/chatSlice"
import alertSound from "/audio/alert.mp3"

function ChatBox() {
    const PUSHER_KEY = import.meta.env.VITE_APP_PUSHER_KEY
    const CLUSTER = import.meta.env.VITE_APP_PUSHER_CLUSTER
    const chats = useSelector((state: ReduxStateType) => state.chat.chatRoom)
    const senderId = useSelector((state: ReduxStateType) => state.user.userData?._id)
    const chatUpdate = useSelector((state: ReduxStateType) => state.chat.chatUpdate)
    const [NotifyMe, setNotifyMe] = useState<notify | null>(null)
    const [messages, setMessages] = useState([])
    const messagesEndRef = useRef<HTMLElement | null>(null);
    const messageSentSoundRef = useRef<HTMLAudioElement | null>(null);
    const dispatch = useDispatch()

    const pusher = new Pusher(PUSHER_KEY, { cluster: CLUSTER });
    const channel = pusher.subscribe(`${chats?._id}`);

    useEffect(() => {
        channel.bind('new-message', function ({ data }: PushNotification) {
            alert('hi')
            if (data?.content) {
                const content = data?.content;
                const sender = data?.sender?.name
                const dp = data?.sender?.image
                console.log(senderId, data?.sender?._id) //test
                if (senderId !== data?.sender?._id) {
                    setNotifyMe({ content, sender, dp });
                    //play sound when message is recieved
                    if (messageSentSoundRef.current && messageSentSoundRef.current.readyState === 4) {
                        messageSentSoundRef.current.play();
                    }
                    dispatch(chatsUpdate())
                }
            }
            setTimeout(() => {
                setNotifyMe(null)
            }, 1000);
        });
    }, [pusher])

    useEffect(() => {
        if (chats?._id) {
            (async () => {
                const { data } = await getMessagesAPI(chats?._id!)
                // console.log(data) //test
                setMessages(data)
            })()
        }
    }, [chats, chatUpdate])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    return (
        <div className="p-4 mb-12">
            {chats ? <>
                {messages ? (messages?.length ?
                    <> {messages.map((message: message, index) => (
                        <div key={index}>
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
                    </> : <div className="text-center">
                        Welcome to the new chat
                    </div>) : null}
            </> : <div className="text-center">
                Click a chat to view messages
            </div>}

            {/* area to focus when new message comes */}
            <div ref={messagesEndRef as React.LegacyRef<HTMLDivElement>}></div>

            <Notification data={NotifyMe} />
            <audio ref={messageSentSoundRef} id="messageSentSound">
                <source src={alertSound} type="audio/mpeg" />
            </audio>
        </div>
    )
}

export default ChatBox