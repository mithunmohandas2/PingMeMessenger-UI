import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../features/user/userSlice"
import { Toaster } from "react-hot-toast"
import ChatBox from "../components/ChatBox"
import MessageInputBox from "../components/MessageInputBox"
import SearchBox from "../components/SearchBox"
import ChatUsersList from "../components/ChatUsersList"
import { useEffect } from "react"

function ChatPage() {
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    function handleLogout() {
        const isConfirm = window.confirm("Sure to Logout")
        if (!isConfirm) return
        dispatch(logout());
        Navigate('/')
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) Navigate('/unauthorized')
    }, [])

    return (
        <div className="flex flex-col h-screen">
            <Toaster />
            {/* ------------------ Header -------------- */}
            <header className="flex items-center justify-between bg-blue-900 text-white p-4">
                <div className="flex zoomEffect">
                    <img src="/images/logo.png" className="w-7 h-7 me-2" alt="logo" />
                    <h1 className="text-xl font-bold">PingMe Messenger</h1>
                </div>

                <button onClick={handleLogout}>Logout</button>
            </header>


            {/* --------------- Main Body ------------*/}
            <main className="flex flex-1 overflow-hidden">

                {/* User List */}
                <div className="w-1/4 bg-gray-200 overflow-y-auto">

                    {/* search Box to search users */}
                    <SearchBox />

                    {/* User list content */}
                    <div className="overflow-y-auto">
                        <ChatUsersList />
                    </div>

                </div>

                <div className="w-3/4 bg-gray-100 overflow-y-auto">

                    {/* Detailed Chat View */}
                    <ChatBox />

                    {/* New chat input Box */}
                    <MessageInputBox />

                </div>
            </main>
        </div>
    )
}

export default ChatPage