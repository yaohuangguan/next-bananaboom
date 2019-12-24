import {useState} from "react";
import ProjectList from "../Projects/ProjectList";
import Background from "../Background/Background";
import PROJECT from '../Projects/PROJECT'
const EnglishIntro = ({title,subtitle,intro}) => {
  const [projects, setprojects] = useState(PROJECT)
  

    return (
      <>
       
        <div className="row" id="content" >
          <div className='col-md-6'>
            <h3 className="linkTag">{title}</h3>
            <p>{subtitle}</p>

            <p style={{lineHeight:'35px'}}>
              {intro}
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
              <a href="mailto:moviegoer24@gmail.com" className="text-secondary">
                moviegoer24@gmail.com
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

export default EnglishIntro;
