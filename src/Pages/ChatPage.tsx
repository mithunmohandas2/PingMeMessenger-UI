import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../features/user/userSlice"
import { getChatsAPI } from "../services/interactionsAPI"
import { chat } from "../types/chatType"
import toast, { Toaster } from "react-hot-toast"
import ChatBox from "../components/ChatBox"
import { openChat } from "../features/chat/chatSlice"
import MessageInputBox from "../components/MessageInputBox"

function ChatPage() {
    const [chats, setChats] = useState([])
    const [search, setSearch] = useState("")
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const fetchChats = async () => {
        const response = await getChatsAPI()
        // console.log(response) //test purpose
        if (response?.data) setChats(response.data)
    }
    useEffect(() => {
        fetchChats()
    }, [])


    function handleLogout() {
        const isConfirm = window.confirm("Sure to Logout")
        if (!isConfirm) return
        dispatch(logout());
        Navigate('/')
    }


    function newGroupHelper() {
        toast.error("pending to implement")
    }


    function searchHelper(e: { preventDefault: () => void }) {
        e.preventDefault()
        if (search?.length < 1) return toast.error("Please enter a search keyword")
        toast.success(search)
    }



    return (
        <div className="flex flex-col h-screen">
            <Toaster />
            {/* Header */}
            <header className="flex items-center justify-between bg-blue-900 text-white p-4">
                <div className="flex zoomEffect">
                    <img src="/images/logo.png" className="w-7 h-7 me-2" alt="logo" />
                    <h1 className="text-xl font-bold">PingMe Messenger</h1>
                </div>

                <button onClick={handleLogout}>Logout</button>

            </header>

            {/* Main Body */}
            <main className="flex flex-1 overflow-hidden">
                {/* User List */}
                <div className="w-1/4 bg-gray-200 overflow-y-auto">

                    <form onSubmit={searchHelper}>

                        <div className="flex items-center m-4 mt-6">
                            <input
                                type="text"
                                placeholder="Search users"
                                className="w-full px-3 py-2 border border-gray-300 focus:outline-none rounded-lg  sm:rounded-lg sm:rounded-r-none " onChange={(e) => setSearch(e.target.value)}
                            />
                            <button type="submit" className="px-4 py-2 bg-gray-100 sm:rounded-lg sm:rounded-l-none hidden sm:block">
                                🔍
                            </button>
                        </div>
                    </form>

                    {/* User list content */}
                    <ul className="p-4">
                        <li className="mb-2 p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg text-center text-bold cursor-pointer w-100"
                            onClick={newGroupHelper} >
                            <div className="flex">
                                <img src="https://cdn0.iconfinder.com/data/icons/user-24x24-pixel/24/users_team_customer_group_profile_add_create_new-512.png" className="w-full sm:w-9 sm:h-9 me-2 rounded-lg" alt="New Group" />
                                <div className="hidden sm:block text-start" >New Group</div>
                            </div>
                        </li>
                        {chats ? (chats?.length ? chats.map((chat: chat) => (
                            //on click chat redux gets updated with chat
                            <li key={chat?._id} className="mb-2 p-2 bg-white hover:bg-gray-50 rounded-lg cursor-pointer"
                                onClick={() => { dispatch(openChat(chat)) }}>
                                {chat?.isGroup ?
                                    <div className="flex">
                                        <img src="https://www.mydemy.co/wp-content/plugins/buddyboss-platform/bp-core/images/group-avatar-legacy.png" className="w-full sm:w-9 sm:h-9 me-2 rounded-lg" alt="logo" />
                                        <div className="hidden sm:block" >{chat.chatName}</div>
                                    </div>
                                    :
                                    <div className="flex">
                                        <img src={chat.users[1].image} className="w-full sm:w-9 sm:h-9 me-2 rounded-lg" alt="logo" />
                                        <div className="hidden sm:block" >{chat.users[1].name}</div>
                                    </div>
                                }

                            </li>
                        )) : null) : null}
                    </ul>
                </div>

                {/* Detailed Chat View */}
                <div className="w-3/4 bg-gray-100 overflow-y-auto">
                    <ChatBox />
                    <MessageInputBox />
                </div>
            </main>
        </div>
    )
}

export default ChatPage