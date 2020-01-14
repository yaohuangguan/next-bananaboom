import { timeSince } from "../../../utils/TimeSince";
import Reply from "./Reply/Reply";
const CommentListItem = ({ user, comment, date, photoURL, id, reply, currentUser }) => {
  return (
    <div>
      {comment ? (
        <div style={{ display: "flex" }}>
          <img
            src={
              photoURL
            }
            alt="avatar"
            width="50px"
            height="50px"
            className="avatar rounded-circle mr-2 ml-0 z-depth-1"
          />
          <div
            className="mb-4 w-100"
            style={{ display: "flex", flexFlow: "column wrap" }}
          >
            <div className="p-3">
              <div className="header mb-2">
                <strong className="primary-font font-weight-bold">
                  {user}
                </strong>
                <small className="pull-right text-muted">{date}</small>
                <br />
              </div>
              <p className="mb-2">{comment}</p>
              <Reply reply={reply} id={id} currentUser={currentUser}/>
            </div>
           
            {id}
          </div>
        </div>
      ) : (
        "No Comments"
      )}
    </div>
  );
};

export default CommentListItem;
