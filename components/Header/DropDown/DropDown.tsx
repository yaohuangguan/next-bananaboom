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
  const { uid, displayName, photoURL, _id } = currentUser;
  return (
    <>
      <div className="dropdown">
        <img src={photoURL} width="40px" height="40px" alt="userprofileimg" />

        <div className="dropdown-submenu py-1">
          <ul className="dropdown-list">
            <Link href="/dashboard/[id]" as={`/dashboard/${_id ? _id : uid}`}>
              <li className="dropdown-item text-info">Dashboard</li>
            </Link>
            {_id ? (
              <li className="dropdown-item text-info" onClick={logout}>
                <a>Log out</a>{" "}
              </li>
            ) : (
              <li
                className="dropdown-item text-info"
                onClick={() => {
                  firebase.auth.signOut();
                  router.reload();
                }}
              >
                <a>Logout</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DropDown;
