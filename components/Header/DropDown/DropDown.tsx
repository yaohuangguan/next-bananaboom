import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import api from "../../../utils/Api";
import firebase from "../../../firebase/firebase";
import Image from 'next/image'
import "./DropDown.scss";
const DropDown = ({ currentUser }:any) => {
  const router = useRouter();
  const logout = async () => {
    if (typeof window != "undefined") {
      localStorage.removeItem("token");
    }
    router.reload();
    return await api.post("/api/users/logout");
  };
  const getUserLogOutOnRoutes = () => {
    return router.pathname === "/" ? "Log out" : "退出登录";
  };
  const getDashboardOnRoutes = () => {
    return router.pathname === "/" ? "Dashboard" : "个人中心";
  };
  const { uid, displayName, photoURL, _id } = currentUser;
  const getGreeting = () => {
    const hour = new Date().getHours();
    const greeting =
      hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
    const greeting_cn = hour < 12 ? "早上好" : hour < 18 ? "下午好" : "晚上好";
    return router.pathname == "/"
      ? `${greeting},${displayName}.`
      : `${greeting_cn},${displayName}`;
  };

  const googleLogOut = () => {
    firebase.auth.signOut();
    router.reload();
  };
  return (
    <>
      <div className="dropdown">
        <Image src={photoURL} width="40px" height="40px" alt="userprofileimg" />

        <div className="dropdown-submenu py-1">
          <ul className="dropdown-list text-center">
            <span className="text-muted" style={{ wordWrap: "break-word" }}>
              {getGreeting()}
            </span>
            <Link href="/dashboard/[id]" as={`/dashboard/${_id ? _id : uid}`}>
              <li className="dropdown-list-item">
                <span>{getDashboardOnRoutes()}</span>
              </li>
            </Link>
            {_id ? (
              <li className="dropdown-list-item" onClick={logout}>
                <span>{getUserLogOutOnRoutes()}</span>{" "}
              </li>
            ) : (
              <li className="dropdown-list-item" onClick={googleLogOut}>
                <span>{getUserLogOutOnRoutes()}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DropDown;
