/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import "./Hamburger.scss";
const Hamburger = props => {
  const {
    vueTube,
    clothing,
    blogName,
    resumeName,
    resumeRoute,
    changeLanguageRoute,
    flag,
    flipFlag
  } = props;

  return (
    <div
      className="toggle"
      style={{ zIndex: 5 }}
      data-toggle="collapse"
      data-target="#navbarSupportedContent15"
      aria-controls="navbarSupportedContent15"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="hamburgers"></span>

      <div
        className="collapse navbar-collapse purple-gradient px-4"
        id="navbarSupportedContent15"
        style={{ transition: "all 0.3s ease-in" }}
      >
        <ul className="navbar-nav mx-auto">
          <li className="nav-item active">
            <Link href="/posts">
              <a className="nav-link text-white font-weight-bold">{blogName} <span className="sr-only">(current)</span></a>
            </Link>
          </li>
          <li className="nav-item">
            <Link
             
              href={resumeRoute}
            >
              <a  className="nav-link text-white font-weight-bold">{resumeName}</a>
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-white font-weight-bold"
              href="https://elated-knuth-62d3bf.netlify.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {vueTube}
            </a>
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
            <Link href={changeLanguageRoute} >
              <a className="nav-link">
                <img
                  src={flag}
                  alt="-flag"
                  className="flag"
                  onMouseOver={flipFlag}
                  title={"This is to credit the author by Flaticon, thank you"}
                />
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Hamburger;
