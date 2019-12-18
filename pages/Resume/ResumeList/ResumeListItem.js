/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const ResumeListItem = (props) => {
  const { id,title,info,url,degree } = props
  return (

      <div className="col-md-4 mb-4">
        <div className="card gradient-card">
          <div
            className="card-image"
            style={{
              backgroundImage:
                "url('https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg')",overflow:'hidden'
            }}
          >
            <a href={url} target='_blank' rel='noopener noreferrer'>
              <div className="text-white d-flex h-100 mask purple-gradient-rgba">
                <div className="first-content align-self-center p-3">
                  <h3 className="card-title" style={{fontSize:'25px'}}>{title}</h3>
                  <p className="mb-0">Click to see details 打开外部链接</p>
                </div>
               
              </div>
            </a>
          </div>

          <div className="third-content ml-auto mr-4 mb-2">
          <h6 className="font-weight-bold float-right"> <span className="text-muted">{id}</span>  {title}</h6>
           <br/>
            <a className="badge badge-secondary float-right">{degree}</a>
          </div>

          <div className="card-body white">
        
            <h4 className="text-uppercase font-weight-bold">Details</h4>
            <p className="text-muted" align="justify">
              {info}
            </p>
          </div>
        </div>
      </div>

  );
};

export default ResumeListItem;
