
import { useRouter } from "next/router";
import ProjectList from "../Projects/ProjectList";
const EnglishIntro = ({ title, subtitle, intro, projects}) => {
  const router = useRouter();
  const projectTitle = () =>
    router.pathname === "/"
      ? "Currently Involved Open-Source Projects"
      : "目前参与的开源项目";
  return (
    <>
      <div className="row" id="content">
        <div className="col-md-12">
          <div className="intro-myself text-center py-3 px-3">
            <h3 className="linkTag">{title}</h3>
            <p>{subtitle}</p>

            <p style={{ lineHeight: "35px",fontSize:'17px' }}>{intro}</p>
            <br />
            <br />
            <br />

            <p className="font-weight-bold">{projectTitle()}</p>
            {projects ? (
              <ProjectList items={projects} />
            ) : (
              "Error:Something went wrong while rendering contents. Please try again!"
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EnglishIntro;
