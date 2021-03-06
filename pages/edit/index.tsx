import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Emitter from "../../utils/EventEmitter";
import ChatLogin from "../../components/Private/Chat/ChatLogin";
import ChatContainer from "../../components/Private/Chat/ChatContainer";
import Layout from "../../components/Layout/Layout";
import io from "../../utils/Socket";
import PrivatePost from "../../components/Private/PrivatePost/PrivatePost";
import DateCounting from "../../components/Private/CountDate/CountDate";
import ToDo from "../../components/Private/ToDo/ToDo";
import {
  USER_CONNECTED,
  LOGOUT,
  ROOM_WELCOME,
} from "../../components/Private/Chat/Events";
import {getPrivatePosts} from '../../service'
import Loader from "../../components/Loader/Loader";
import "./edit.scss";
const CKEditor = dynamic(() => import("../../components/CKeditor/Editor"), {
  ssr: false,
});
const socketURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://nextbananaboom.herokuapp.com";
export interface IYouAndMeProps {
  currentUser: {
    date: string;
    displayName: string;
    email: string;
    photoURL: string;
    private_token?: string;
    vip: boolean;
    _id: string;
  };
  posts?: any;
  errors: string;
  todos?: any;
}
const index = ({ currentUser, posts, errors, todos }: IYouAndMeProps) => {
  const router = useRouter();
  const [socket, setSocket] = useState(null);
  const [chatUser, setuser] = useState("");
  const [privatePosts, setprivatePosts] = useState("");
  const [loading, setLoading] = useState(false);
  const getVip = useMemo(
    () =>
      currentUser ? currentUser.private_token === "ilovechenfangting" : null,
    [currentUser]
  );
  useEffect(() => {
    const socket = io(socketURL);
    const connectSocket = () => {
      socket.on("connect", () => {
        console.log("Socket Connected");
      });
      setSocket(socket);
    };
    socket.on(ROOM_WELCOME, (data) => console.log(data));

    connectSocket();
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [socketURL]);
  useEffect(() => {
    document.body.style.backgroundColor = "#E5CCFF";
    document.body.style.color = "#333";
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, [currentUser]);

  //subscribe event
  Emitter.subscribe("getNewPrivatePosts", (data:any) => setprivatePosts(data));
  useEffect(() => {
    return () => {
      Emitter.off("getNewPrivatePosts");
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    const getNewPrivatePosts = async () => {
      try {
        const data = await getPrivatePosts();
        setLoading(false);
        setprivatePosts(data);
      } catch (error) {
          setLoading(false);
        }
      
    };
    getNewPrivatePosts();
  }, []);

  const setUser = (user: any) => {
    socket.emit(USER_CONNECTED, user);
    console.log("user", user);
    setuser(user);
  };
  const logout = () => {
    socket.emit(LOGOUT);
    setuser(null);
  };
  const getChatRoom = () => {
    return !chatUser ? (
      <ChatLogin socket={socket} setUser={setUser}></ChatLogin>
    ) : (
      <ChatContainer
        socket={socket}
        chatUser={chatUser}
        logout={logout}
      ></ChatContainer>
    );
  };
  const handleErrors = () =>
    errors ? <div className="text-danger">{errors}</div> : null;
  const getLoveTitle = () => (
    <div className="p-2 m-3 text-center z-depth-1 love-title">
      <span>
        Sam{" "}
        <svg className="heart-purple" viewBox="0 0 32 30">
          <path
            d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
    	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
          />
        </svg>{" "}
        Cennifer
      </span>
    </div>
  );
  return (
    getVip && (
      <Layout head={`${getVip ? "Loving you" : "404 Not Found"}`}>
        <div>
          <div className="row love-container">
            {/* <ChrismasLight></ChrismasLight> */}
            <DateCounting
              fromDate={"February 14 2020 00:00:00"}
              isPrivate={true}
            ></DateCounting>
            {getLoveTitle()}

            <div className="main-love-container">
              <div className="love-left-side">
                {handleErrors() || loading ? (
                  <div className="private-post-loader">
                    <Loader size="150px" color="text-secondary"></Loader>
                  </div>
                ) : (
                  <PrivatePost privatePosts={privatePosts} currentUser={currentUser} ></PrivatePost>
                )}
              </div>

              <div className="text-center scroll-friendly bg-secondary white-text">
                滑动这里滑动整个页面 <br />{" "}
              </div>

              <div className="love-right-side">
                <ToDo></ToDo>
                <div className="blog-container">
                  <CKEditor></CKEditor>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  );
};

export default index;
