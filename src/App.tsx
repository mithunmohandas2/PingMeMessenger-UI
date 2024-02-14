import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import ChatPage from "./Pages/ChatPage"
import RegisterPage from "./Pages/RegisterPage"
import Error401 from "./components/Error401"
import Error404 from "./components/Error404"


function App() {

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
