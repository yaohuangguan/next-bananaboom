import React from "react";
import firebase from '../../../firebase/firebase'
import './DropDown.scss'
const DropDown = ({ currentUser }) => {
  return (
    <>
      <div className="dropdown">
        <img
          src={currentUser.photoURL}
          width="40px"
          height="40px"
          alt="userprofileimg"
        />

        <div className="dropdown-submenu py-1">
          <ul className="dropdown-list">
            <li className="dropdown-item text-info">
              <a>Dashboard</a>
            </li>
            <li className="dropdown-item text-info" onClick={()=>firebase.auth.signOut()}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DropDown;
