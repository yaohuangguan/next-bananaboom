import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "../../utils/Api";
import ChatLogin from "../../components/Chat/ChatLogin";
import ChatContainer from '../../components/Chat/ChatContainer'
import Layout from "../../components/Layout/Layout";
import io from "../../utils/Socket";
import { USER_CONNECTED, LOGOUT,ROOM_WELCOME } from "../../components/Chat/Events";
import DrawingCanvas from '../../components/DrawingCanvas/Drawing'
import "./youandme.scss";

const socketURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://nextbananaboom.herokuapp.com";

const index = ({ currentUser }) => {
  const router = useRouter();
  const [socket, setSocket] = useState(null);
  const [chatUser, setuser] = useState('');
  const getVip = () => (currentUser ? currentUser.vip : null);
  useEffect(() => {
    const socket = io(socketURL);
    const connectSocket = () => {
      socket.on("connect", () => {
        console.log("Socket Connected");
      });
      setSocket(socket);
    };
    socket.on(ROOM_WELCOME,data => console.log(data))

    connectSocket();
    return () => {
      socket.emit('disconnect')
      socket.off()
    };
  }, [socketURL]);
  useEffect(() => {
    const checkLogin = () => {
      if (currentUser) {
        if (currentUser.vip) {
          return null;
        }
      }
      return router.back();
    };
    checkLogin();
    document.body.style.backgroundColor = '#E5CCFF'
    return () => {
      document.body.style.backgroundColor = 'white'
    };
  }, [currentUser]);
  const setUser = user => {
    socket.emit(USER_CONNECTED, user);
    console.log("user", user);
    setuser(user);

  };
  const logout = () => {
    socket.emit(LOGOUT);
    setuser(null);
  };
  const getChatRoom = () => {
    return  !chatUser ? <ChatLogin socket={socket} setUser={setUser}></ChatLogin> : <ChatContainer socket={socket} chatUser={chatUser} logout={logout}></ChatContainer>
  };
  const getLoveDate = () =>{
    return (
      <div>Date here</div>
    )

  }
  return (
    <Layout>
      <div>
        {getVip() ? (
          <div className="row love-container">
            <div className="col-lg-12 p-3 m-3 text-center">
              <span className='z-depth-1 px-2  py-2 love-title'>
                Sam{" "}
                <svg className="heart-purple" viewBox="0 0 32 30">
                  <path
                    d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
    	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                  />
                </svg>{" "}
                Cennifer
              </span>

                <DrawingCanvas></DrawingCanvas>

            </div>
            <div className="col-lg-12 main-love-container" style={{borderTop:'5px dotted yellow'}}>
              <div
                className="w-50 love-left-side"
              >
                {getChatRoom()}
              </div>
              <div
                className="w-50 love-right-side"
              >
                {getLoveDate()}
              </div>
  
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default index;
