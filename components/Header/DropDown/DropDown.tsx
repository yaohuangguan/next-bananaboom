import React from "react";
import router from "next/router";
import Link from "next/link";
import firebase from "../../../firebase/firebase";
import "./DropDown.scss";
const DropDown = ({ currentUser }) => {
  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("currentUser");
    router.reload();
  };
  const getUserLogOutOnRoutes = () => {
    return router.pathname === "/" ? "Log out" : "退出登录";
  };
  const getDashboardOnRoutes = () => {
    return router.pathname === "/" ? "Dashboard" : "个人中心";
  };
  const { uid, displayName, photoURL, _id } = currentUser;
  return (
    <>
      <div className="dropdown">
        <img src={photoURL} width="40px" height="40px" alt="userprofileimg" />

        <div className="dropdown-submenu py-1">
          <ul className="dropdown-list">
            <Link href="/dashboard/[id]" as={`/dashboard/${_id ? _id : uid}`}>
              <li className="dropdown-item text-secondary">
                {getDashboardOnRoutes()}
              </li>
            </Link>
            {_id ? (
              <li className="dropdown-item text-secondary" onClick={logout}>
                <a>{getUserLogOutOnRoutes()}</a>{" "}
              </li>
            ) : (
              <li
                className="dropdown-item text-secondary"
                onClick={() => {
                  firebase.auth.signOut();
                  router.reload();
                }}
              >
                <a>{getUserLogOutOnRoutes()}</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DropDown;
