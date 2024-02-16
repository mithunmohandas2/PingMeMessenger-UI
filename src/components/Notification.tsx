import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { notify } from "../types/pushNotificationType"

function Notification(props: any) {
    const [popUp, setPopUp] = useState<notify | null>(null)

    useEffect(() => {
        // console.log("props", props.data)
        if (props?.data) setPopUp(props.data)
    }, [props])

    return (
        <>
            {popUp && toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                {popUp?.dp ? <>
                                    <img className="h-10 w-10 rounded-full" src={popUp.dp} alt="User DP" />
                                </> : null}
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    {popUp?.sender ? popUp.sender : "Guest User"}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    {popUp?.content ? popUp.content : "message"}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                        <button
                            onClick={() => { toast.dismiss(t.id); setPopUp(null) }}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Notification