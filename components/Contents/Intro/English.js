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
            <h3 className="linkTag">Always on the road</h3>
            <p>Hi, I am Sam.</p>
            <br />

            <p>
              I am a Full stack developer and designer, open source software
              contributor at BeeHex 3D food printing
            </p>
            <p>
              You can also find some of my projects and posts on GitHub and CSDN
            </p>
           
            <br />
            <br />
            <p className="font-weight-bold">Currently Involved Projects</p>
            {projects[1].id === 2 ? (
              <ProjectList items={projects[1].items} />
            ) : (
              "Error:Something went wrong while rendering contents. Please try again!"
            )}
            <br />
            <br />
            <br />
            <p className="font-weight-bold">Say Hi</p>
            <p>
              Email:
              <a href="mailto:sam@beehex.com" className="text-secondary">
                sam@beehex.com
              </a>
            </p>
            <p>
              CSDN Blog:
              <a
                href="https://blog.csdn.net/samKnowsCoding"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary"
              >
                samKnowsCoding
              </a>
            </p>
            <p>
              Medium:
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
