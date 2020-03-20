import Loader from "../../../Loader/Loader";

const ReplyListItem = ({
  //commentid
  id,
  content,
  date,
  photoURL,
  user,
  targetUser,
  handleTargetUser,
  replyContent,
  handleReplyChange,
  makeReplyReq,
  loading
}) => {

  const showReply = e => {
    const reply = document.getElementById(id);
    if (reply) {
      reply.classList.toggle("d-none");
    }
    handleTargetUser(user);
  };

  return (
    <div style={{ display: "flex" }}>
      <img
        src={photoURL}
        alt="avatar"
        width="40px"
        height="40px"
        className="avatar rounded-circle mt-3"
      />
      <div
        className="mb-1 w-100"
        style={{ display: "flex", flexFlow: "column wrap" }}
      >
        <div className="p-3">
          <div className="mb-2">
            <strong className="primary-font font-weight-bold">{user}</strong>
            <small className="pull-right text-muted">{date}</small>
            <br />
          </div>
          <p className="mb-2">
            {targetUser ? (
              <span className="bg-light">@{targetUser}</span>
            ) : null}
            {content}
          </p>
        </div>

        <a
          onClick={showReply}
          className="text-primary"
          style={{ alignSelf: "flex-end" }}
        >
          回复
        </a>
        <div
          className="w-100 m-0 d-none reply form-group"
          style={{ position: "relative" }}
          id={id}
        >
          <a
            className="bg-success white-text"
            style={{
              position: "absolute",
              left: 0,
              top: "-25px",
              borderRadius: "30px"
            }}
          >
            @{user}
          </a>
          <input
            type="text"
            className="form-control reply-field"
            placeholder="Enter your public reply here..."
            value={replyContent}
            onChange={handleReplyChange}
          />
          <button
            type="submit"
            className="bg-dark btn-sm text-white"
            onClick={makeReplyReq}
          >
            {!loading ? "发送" : <Loader />}
          </button>
        </div>
      </div>
      <style jsx>{`
        .reply-field {
          box-shadow: none;
          border: 2px solid #333;
          border-radius: 30px;
        }
        .reply-field:focus {
          border: none;
          outline: none;
          border: 2px solid #2eca6a;
          border-color: #2eca6a;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
};

export default ReplyListItem;
