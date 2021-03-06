import { useState } from "react";
import { CONFIRM_USER } from "./Events.js";
import "./chat.scss";
const ChatLogin = ({ socket, setUser }) => {
  const [nickname, setnickname] = useState("");
  const [error, seterror] = useState("");
  const isUser = ({user}) =>{
    if(user){
      setUser(user)
    }
  }
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if(!nickname || nickname.trim() == ''){
        return seterror('输入名字')
      }
      await socket.emit(CONFIRM_USER, nickname, isUser);
    } catch (error) {
      seterror(error);
    }
  };
  const handleNickname = e => {
    setnickname(e.target.value);
  };
  return (
    <div className="socket-chat-login col-md-6">
      <form onSubmit={handleSubmit} className="socket-chat-login-form">
        <label htmlFor="nickname"></label>
        <input
          type="text"
          className="heart-input"
          type="text"
          id="nickname"
          value={nickname}
          onChange={handleNickname}
          placeholder={"名称"}
        />
        <button
          type="submit"
          className='btn-sm btn-secondary'
        >
          ❤
        </button>
        <div className="socket-chat-error text-danger">{error ? error : null}</div>
      </form>
    </div>
  );
};

export default ChatLogin;
