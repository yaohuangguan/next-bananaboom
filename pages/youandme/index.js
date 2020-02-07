import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "../../utils/Api";
import ChatLogin from "../../components/Chat/ChatLogin";
import ChatContainer from '../../components/Chat/ChatContainer'
import Layout from "../../components/Layout/Layout";
import io from "../../utils/Socket";
import { USER_CONNECTED, LOGOUT,ROOM_WELCOME } from "../../components/Chat/Events";
import "../../components/Chat/chat.scss";
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
    const connectSocket = () => {
      const socket = io(socketURL);
      socket.on("connect", () => {
        console.log("Socket Connected");
      });

      setSocket(socket);
    };
    connectSocket();
    return () => {};
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
    return () => {};
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
  return (
    <Layout>
      <div>
        {getVip() ? (
          <div className="row">
            <div className="col-lg-12 p-3 m-3 text-center">
              <h1>
                Sam{" "}
                <svg className="heart-purple" viewBox="0 0 32 30">
                  <path
                    d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
    	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                  />
                </svg>{" "}
                Cennifer秘密基地
              </h1>
            </div>
            <div
              id="messages"
              className="col-md-6"
              style={{ border: "2px solid black", padding: "10px" }}
            >
              {getChatRoom()}
            </div>

            <div className="col-md" style={{ border: "2px solid black" }}>
              施工区域
            </div>
            <div
              className="col-lg-12 p-5"
              style={{ border: "2px solid black" }}
            >
              施工区域
            </div>

            <div
              className="col-md-6"
              style={{ border: "2px solid black", padding: "300px" }}
            >
              施工区域
            </div>
            <div
              className="col-md-6"
              style={{ border: "2px solid black", padding: "300px" }}
            >
              施工区域
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default index;
