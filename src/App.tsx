import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import ChatPage from "./Pages/ChatPage"
import RegisterPage from "./Pages/RegisterPage"
import Error401 from "./components/Error401"
import Error404 from "./components/Error404"
import { useDispatch, useSelector } from "react-redux"
import { ReduxStateType } from "./types/reduxTypes"
import { useEffect } from "react"
import { login } from "./features/user/userSlice"


function App() {
  const dispatch = useDispatch()
  const { userData } = useSelector((state: ReduxStateType) => state.user)
  
  useEffect(() => {
    if (localStorage.getItem('userInfo') && !userData) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo")!)
      dispatch(login(userInfo))
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chats" element={<ChatPage />} />

        <Route path="/unauthorized" element={<Error401 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  )
}

export default App
