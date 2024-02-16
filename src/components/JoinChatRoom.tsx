import toast from "react-hot-toast"

function JoinChatRoom() {

    function newGroupHelper() {
        toast.error("pending to implement")
      }

    return (
        <>
            <li className="mb-2 p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg text-center text-bold cursor-pointer w-100"
                onClick={newGroupHelper} >
                <div className="flex">
                    <img src="https://cdn0.iconfinder.com/data/icons/user-24x24-pixel/24/users_team_customer_group_profile_add_create_new-512.png" className="w-full sm:w-9 sm:h-9 me-2 rounded-lg" alt="New Group" />
                    <div className="hidden sm:block text-start" >New Chat Room</div>
                </div>
            </li>
        </>
    )
}

export default JoinChatRoom