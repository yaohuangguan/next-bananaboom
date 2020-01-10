import { timeSince } from "../../../utils/TimeSince";
const CommentListItem = ({ user, comment, date, photoUrl, id, reply }) => {

  const showReply = e => {
    const reply = document.getElementById(id);
    reply.classList.toggle("d-none");
  };
  return (
    <div>
      {comment ? (
        <div style={{ display: "flex" }}>
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
          <div
            className="mb-4 w-100"
            style={{ display: "flex", flexFlow: "column wrap" }}
          >
            <div className="p-3 z-depth-1">
              <div className="header mb-2">
                <strong className="primary-font font-weight-bold">
                  {user}
                </strong>
                <small className="pull-right text-muted">{date}</small>
                <br />
              </div>
              <p className="mb-2">{comment}</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <a
                  onClick={showReply}
                  className="text-primary"
                  style={{ alignSelf: "flex-end" }}
                >
                  Reply
                </a>
                <div>
                  <a>
                    <img src="https://img.icons8.com/windows/24/000000/comments.png"></img>
                    {reply.length}
                  </a>
                </div>
              </div>
              <div className="w-100 md-form m-0 d-none reply" id={id}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your public reply here..."
                />
              </div>
            </div>
            {reply.length == 0 ? "No reply" : 'has reply'}
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
