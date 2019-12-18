import React from "react";
import ProjectList from "../Projects/ProjectList";
import Background from "../Background/Background";
import PROJECT from "../Projects/PROJECT";
class Text extends React.Component {
  state = {
    projects: PROJECT
  };
  render() {
    const { projects } = this.state;
    return (
      <>
        <br />
        <br />
        <br />
        <br />

        <div className="row">
          <div className="col-md-6" id="content">
            <h3 className="linkTag">永远在路上</h3>

            <p>嗨，我是Sam</p>
            <br />

            <p>我是一名全端开发工程师和设计师，开源社区贡献者在BeeHex 3D食品打印</p>

            <p>
              你也可以在 GitHub 上找到我的一些项目和在 CSDN 上找到我发布的博客
            </p>

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
              <a href="mailto:sam@beehex.com" className="text-secondary">
                sam@beehex.com
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
  }
}

export default Text;
