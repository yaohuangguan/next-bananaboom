import {useState} from 'react'
import SideBar from './SideBar'
const ChatContainer = ({chatUser,logout,socket}) => {
  const [activeChat, setactiveChat] = useState(null)
  const [chats, setchats] = useState([])

  const handleActiveChat = (activeChat) =>{
    setactiveChat(activeChat)
  }
  return (
    <div className='p-5'>
    {chatUser.name}
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
