/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import React, { useState } from "react";
import "./Hamburger.scss";
class Hamburger extends React.Component {
  state = {
    open: true
  };
  render() {
    const {
      login,
      clothing,
      blogName,
      resumeName,
      resumeRoute,
      changeLanguageRoute,
      flag,
      flipFlag
    } = this.props;
    return (
      <div>
        <div className="toggle px-3 py-3">
          <span className="hamburgers"></span>
        </div>

        {this.state.open ? (
          <div
            className="fat-menu purple-gradient px-4"
            style={{ transition: "all 0.3s ease-in" }}
          >
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
                <a
                  className="nav-link text-white font-weight-bold"
                  href="https://nervous-bohr-eff732.netlify.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {clothing}
                </a>
              </li>
              <li className="nav-item">
              <Link href='/login'>
              <a
                className="nav-link text-white font-weight-bold"
              >
                {login}
              </a>
            </Link>
              </li>
              <li className="nav-item">
                <Link href={changeLanguageRoute}>
                  <a className="nav-link text-white font-weight-bold">
                  {changeLanguageRoute == '/' ? '🇬🇧English' : '🇨🇳中文'}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Hamburger;
