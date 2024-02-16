import { openSingleChatAPI, performSearchAPI } from "../services/interactionsAPI";
import { openChat, usersListUpdate } from "../features/chat/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStateType } from "../types/reduxTypes";
import { useState } from "react"
import { User } from "../types/userTypes";
import toast from "react-hot-toast"
import Modal from "react-modal"

function SearchBox() {
    const userId = useSelector((state: ReduxStateType) => state.user.userData?._id)
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State variable for modal visibility
    const dispatch = useDispatch()

    async function searchHelper(e: { preventDefault: () => void }) {
        e.preventDefault()
        // if (searchKeyword?.length < 1) return toast.error("Please enter a search keyword") //validation temp
        const { data } = await performSearchAPI(searchKeyword);
        if (data) {
            // console.log(data) //test 
            setSearchResults(data);
            setIsModalOpen(true); // Open the modal
        }
    }
    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    async function openChatHelper(_id: string | undefined) {
        if (_id === userId) return toast.error("Self chat not available")
        const confirmation = window.confirm("Continue to chat?");
        if (!confirmation) return
        if (_id) {
            const openSingleChat = await openSingleChatAPI(_id);
            if (openSingleChat?.data) {
                dispatch(usersListUpdate());
                closeModal();
                dispatch(openChat(openSingleChat.data))
            }
        }
    }

    return (
        <>
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

            {/* Modal */}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} ariaHideApp={false}>
                <h2 className="text-center text-xl bg-blue-600 text-white py-2 rounded-lg mb-10">Search Results</h2>
                <ul>
                    <div className="mx-auto max-w-7xl px-2 md:px-0 my-4">
                        <div className="grid grid-cols-2 gap-[30px] md:grid-cols-4">

                            {searchResults.map((user: User, index) => (
                                <li key={index}>

                                    {/* user card */}
                                    <div className="max-w-xs mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-4 zoomEffect"
                                        onClick={() => { openChatHelper(user._id) }}>
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
                <button className="fixed bottom-12 end-14" onClick={closeModal}>Close</button>
            </Modal>
        </>
    )
}

export default SearchBox