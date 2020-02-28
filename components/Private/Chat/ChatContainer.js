import {useState} from 'react'
import SideBar from './SideBar'
const ChatContainer = ({chatUser,logout,socket}) => {
  const [activeChat, setactiveChat] = useState(null)
  const [chats, setchats] = useState([])

  const handleActiveChat = (activeChat) =>{
    setactiveChat(activeChat)
  }
  return (
    <div style={{
      backgroundColor: "rgba(255,255,255,0.8)",
      padding: "40px",
      borderRadius: "50px",
      marginBottom: "20px"
    }}>
    Your name:{chatUser.name}
      <SideBar
      logout={logout}
      chats={chats}
      chatUser={chatUser}
      handleActiveChat={handleActiveChat}
      activeChat={activeChat}
      ></SideBar>


    </div>
  )
}

export default ChatContainer
