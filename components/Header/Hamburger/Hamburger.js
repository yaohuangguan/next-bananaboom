/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import { withRouter } from "next/router";
import "./Hamburger.scss";
const Hamburger = ({
  blogName,
  resumeName,
  resumeRoute,
  changeLanguageRoute,
  currentUser,
  router
}) => {
  const getResumeRoutes = () => (router.pathname == "/" ? "en-us" : "ch-cn");
  return (
    <div className="dropdown-mobile-submenu px-1 mx-auto text-center">
      <Link href="/blogs">
        <a className="nav-link">
          {blogName} <span className="sr-only">(current)</span>
        </a>
      </Link>

      <Link href={resumeRoute} as={`/resume/${getResumeRoutes()}`}>
        <a className="nav-link">{resumeName}</a>
      </Link>

      <Link href={changeLanguageRoute}>
        <a className="nav-link">
          {changeLanguageRoute == "/" ? "English" : "中文"}
        </a>
      </Link>
    </div>
  );
};

export default withRouter(Hamburger);
