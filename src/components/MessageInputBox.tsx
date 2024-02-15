import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { sendMessageAPI } from "../services/interactionsAPI"
import { useSelector } from "react-redux"
import { ReduxStateType } from "../types/reduxTypes"
import alertSound from "/audio/alert.mp3"


function MessageInputBox() {
    const [content, setContent] = useState("");
    const chatId = useSelector((state: ReduxStateType) => state.chat.chatRoom?._id);
    const messageSentSoundRef = useRef<HTMLAudioElement | null>(null);

    async function sendMessage(e: { preventDefault: () => void }) {
        e.preventDefault()
        if (content?.length < 1) return toast.error("Please type a message to send")
        const sendMessage = await sendMessageAPI(chatId!, content)
        if (sendMessage?.data) {
            toast.success("message sent")
            if (messageSentSoundRef.current) {
                messageSentSoundRef.current.play();
            }
        }
    }

    useEffect(() => {
        setContent("")
    }, [chatId])

    return (
        <>
            <form onSubmit={sendMessage}>
                <div className="absolute bottom-0 left-0 w-full px-4 bg-white">
                    <div className="flex items-center m-4 bottom-0">
                        <input
                            type="text"
                            placeholder="Type the message to send" value={content}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 me-1" onChange={(e) => setContent(e.target.value)}
                        />
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                            send
                        </button>
                    </div>

                    <audio ref={messageSentSoundRef} id="messageSentSound">
                        <source src={alertSound} type="audio/mpeg" />
                        <p className="text-xs absolute z-20 bottom-0">* Your browser does not support the audio for sound playback</p>
                    </audio>
                </div>
            </form>

        </>
    )
}

export default MessageInputBox