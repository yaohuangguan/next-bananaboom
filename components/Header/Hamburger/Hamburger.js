/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import { withRouter } from "next/router";
const Hamburger = ({
  blogName,
  resumeName,
  resumeRoute,
  changeLanguageRoute,
  currentUser,
  router
}) => {
  const getResumeRoutes = () =>router.pathname == "/" ? "en-us" : "ch-cn"
  return (
        <div
          className="dropdown-mobile-submenu bg-secondary px-1"
        >
    <br/> 
          <ul className="navbar-nav mx-auto text-center">
            <li className="nav-item">
              <Link href="/blogs">
                <a className="nav-link text-white font-weight-bold">
                  {blogName} <span className="sr-only">(current)</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href={resumeRoute}
                as={`/resume/${getResumeRoutes()}`}
              >
                <a className="nav-link text-white font-weight-bold">
                  {resumeName}
                </a>
              </Link>
            </li>
  
            <li className="nav-item">
              <Link href={changeLanguageRoute}>
                <a className="nav-link text-white font-weight-bold">
                  {changeLanguageRoute == "/" ? "English" : "中文"}
                </a>
              </Link>
            </li>
          </ul>
        </div>

  );
};

export default withRouter(Hamburger);
