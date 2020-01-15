import {useState} from "react";
import ProjectList from "../Projects/ProjectList";
import Background from "../Background/Background";
const EnglishIntro = ({title,subtitle,intro, projects}) => {

    return (
      <>
        <div className="row" id="content" >
          <div className='col-md-12'>
            <div className="intro-myself text-center py-3 px-3">
              <h3 className="linkTag">{title}</h3>
              <p>{subtitle}</p>
  
              <p style={{lineHeight:'35px'}}>
                {intro}
              </p>
             <br/><br/><br/>
            

              <p className="font-weight-bold">Currently Involved Open-Source Projects</p>
              {projects ? (
                <ProjectList items={projects} />
              ) : (
                "Error:Something went wrong while rendering contents. Please try again!"
              )}
            </div>
            
            <div className="say-hi">
              <p className="font-weight-bold">Say Hi</p>
              <p>
                Email:
                <a href="mailto:moviegoer24@gmail.com" className="text-dark">
                  moviegoer24@gmail.com
                </a>
              </p>
              <p>
                CSDN Blog:
                <a
                  href="https://blog.csdn.net/samKnowsCoding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark"
                >
                  samKnowsCoding
                </a>
              </p>
              <p>
                Medium:
                <a
                  className="text-dark"
                  href="https://medium.com/@yaob"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @yaob
                </a>
              </p>
            </div>

            <br />
            <br />
          </div>
         
        </div>
      </>
    );
            }

export default EnglishIntro;
