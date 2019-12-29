import React from "react";

const CommentListItem = ({ user, comment, date, photoUrl, id}) => {
  return (
    <div>
      {comment ? (
        <div>
          <li className="d-flex mb-4">
            <img
              src={
                photoUrl
                  ? photoUrl
                  : "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"
              }
              alt="avatar"
              width="50px"
              height="50px"
              className="avatar rounded-circle mr-2 ml-0 z-depth-1"
            />
            <div className="chat-body white p-3 ml-2 z-depth-1">
              <div className="header">
                <strong className="primary-font font-weight-bold">{user}</strong>
                <small className="pull-right text-muted">
                  <i className="far fa-clock"></i> {date}
                </small><br/>
                <span style={{fontSize:'3px'}}>Comment ID:{id}</span>
              </div>
              <hr className="w-100" />
              <p className="mb-0">{comment}</p>
            </div>
          </li>
        </div>
      ) : (
        "No Comments"
      )}
    </div>
  );
};

export default CommentListItem;
