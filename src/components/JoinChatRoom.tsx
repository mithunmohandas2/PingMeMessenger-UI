import { useState } from "react";
import toast from "react-hot-toast"
import { useSelector } from "react-redux";
import { ReduxStateType } from "../types/reduxTypes";
import Modal from "react-modal"
import { User } from "../types/userTypes";
import { performSearchAPI } from "../services/interactionsAPI";


function JoinChatRoom() {
    const [isModalOpen, setIsModalOpen] = useState(false); // State variable for modal visibility
    const userId = useSelector((state: ReduxStateType) => state.user.userData?._id)
    const [chatName, setChatName] = useState("");
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    function newGroupCreateHelper() {
        toast.error("pending to implement")
    }

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };


    async function searchHelper(e: { preventDefault: () => void }) {
        e.preventDefault()
        // if (searchKeyword?.length < 1) return toast.error("Please enter a search keyword") //validation temp
        const { data } = await performSearchAPI(searchKeyword);
        if (data) {
            // console.log(data) //test 
            setSearchResults(data);
        }
    }

    function addToGroupHelper(_id: any) {
        throw new Error("Function not implemented.");
    }

    return (
        <>
            <li className="mb-2 p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg text-center text-bold cursor-pointer w-100"
                onClick={() => setIsModalOpen(true)} >
                <div className="flex">
                    <img src="https://cdn0.iconfinder.com/data/icons/user-24x24-pixel/24/users_team_customer_group_profile_add_create_new-512.png" className="w-full sm:w-9 sm:h-9 me-2 rounded-lg" alt="New Group" />
                    <div className="hidden sm:block text-start" >New Chat Room</div>
                </div>
            </li>


            {/* Modal */}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} ariaHideApp={false}>
                <h2 className="text-center text-xl bg-blue-600 text-white py-2 rounded-lg mb-10">Join Chat Room</h2>
                <label htmlFor="chatName">Chat Name</label>
                <input type="text" value={chatName}  placeholder="Enter a name for chat"
                onChange={(e) => setChatName(e.target.value)} />


                {/* searchbox */}
                <form onSubmit={searchHelper}>
                    <div className="flex items-center m-4 mt-6">
                        <input
                            type="text"
                            placeholder="Search users"
                            className="w-full px-3 py-2 border border-gray-300 focus:outline-none rounded-lg  sm:rounded-lg sm:rounded-r-none " onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <button type="submit" className="px-4 py-2 bg-gray-100 sm:rounded-lg sm:rounded-l-none hidden sm:block">
                            🔍
                        </button>
                    </div>
                </form>

                <ul>
                    <div className="mx-auto max-w-7xl px-2 md:px-0 my-4">
                        <div className="grid grid-cols-2 gap-[30px] md:grid-cols-4">

                            {searchResults.map((user: User, index) => (
                                <li key={index}>

                                    {/* user card */}
                                    <div className="max-w-xs mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-4 zoomEffect"
                                        onClick={() => { addToGroupHelper(user._id) }}>
                                        <img className="w-full h-auto" src={user.image} alt={user.name} />
                                        <div className="p-4">
                                            <h3 className="text-sm font-semibold">{user.name}</h3>
                                            <p className="text-gray-600 text-xs">{user.email}</p>
                                        </div>
                                    </div>

                                </li>
                            ))}
                        </div>
                    </div>
                </ul>

                <button className="" onClick={newGroupCreateHelper}>Create Group Chat</button>

                <button className="fixed bottom-12 end-14" onClick={closeModal}>Close</button>
            </Modal>
        </>
    )
}

export default JoinChatRoom