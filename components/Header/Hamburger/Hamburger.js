/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const Signup = dynamic(() => import("../../Auth/Signup"), {
  ssr: false
});
const Dropdown = dynamic(()=>import('../DropDown/DropDown'),{
  ssr:false
})
const Hamburger = ({
  login,
  blogName,
  resumeName,
  resumeRoute,
  changeLanguageRoute,
  currentUser
}) => {
  return (
    <div className="toggle dropdown-mobile " style={{ zIndex: 5 }}>
      <span className="hamburgers"></span>
      <div className="dropdown-mobile-submenu purple-gradient px-4">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item active">
            <Link href="/blogs/blog">
              <a className="nav-link text-white font-weight-bold">
                {blogName} <span className="sr-only">(current)</span>
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href={resumeRoute}>
              <a className="nav-link text-white font-weight-bold">
                {resumeName}
              </a>
            </Link>
          </li>

          <li className="nav-item">
            {currentUser ? (
              <div className="nav-link text-white font-weight-bold">
                <Dropdown currentUser={currentUser}></Dropdown>
              </div>
            ) : (
              <div className="nav-link text-white font-weight-bold">
                <Signup login={login}></Signup>
              </div>
            )}
          </li>
          <li className="nav-item">
            <Link href={changeLanguageRoute}>
              <a className="nav-link text-white font-weight-bold">
                {changeLanguageRoute == "/" ? "🇬🇧English" : "🇨🇳中文"}
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Hamburger;
