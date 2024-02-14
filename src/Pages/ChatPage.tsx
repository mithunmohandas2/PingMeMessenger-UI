import axios from "axios"
import { useEffect, useState } from "react"

function ChatPage() {
    const [chats, setChats] = useState([])

    const fetchChats = async () => {
        const { data } = await axios.get('/api/chats')
        console.log(data) //test purpose
        setChats(data)
    }
    useEffect(() => {
        fetchChats()
    }, [])


    return (
        <div>
            {chats.map((chat) => (
                <div key={chat?._id}>
                    {chat?.chatName? chat.chatName : ""}
                </div>
            ))}

        </div>
    )
}

export default ChatPage