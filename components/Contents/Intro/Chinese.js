import { useState } from "react";
import ProjectList from "../Projects/ProjectList";
import Background from "../Background/Background";
import PROJECT from "../Projects/PROJECT";
const Text = ({ title, subtitle, intro }) => {
  const [projects, setprojects] = useState(PROJECT);
  return (
    <>
      <div id="content" className="row">
        <div className="col-md-6">
          <h3 className="linkTag">{title}</h3>

          <p>{subtitle}</p>

          <p style={{ lineHeight: "35px" }}>{intro}</p>

          <br />
          <br />
          <p className="font-weight-bold">目前开发中项目</p>
          {projects[0].id === 1 ? (
            <ProjectList items={projects[0].items} />
          ) : (
            "错误:可能是渲染出现了错误，请重试"
          )}
          <br />
          <br />
          <br />
          <p className="font-weight-bold">打招呼</p>
          <p>
            邮箱：
            <a href="mailto:moviegoer24@gmail.com" className="text-secondary">
              moviegoer24@gmail.com
            </a>
          </p>

          <p>
            CSDN博客:
            <a
              className="text-secondary"
              href="https://blog.csdn.net/samKnowsCoding"
              target="_blank"
              rel="noopener noreferrer"
            >
              samKnowsCoding
            </a>
          </p>
          <p>
            Medium博客:
            <a
              className="text-secondary"
              href="https://medium.com/@yaob"
              target="_blank"
              rel="noopener noreferrer"
            >
              @yaob
            </a>
          </p>

          <br />
          <br />
        </div>
        <Background></Background>
      </div>
    </>
  );
};

export default Text;
