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
        <div className="w-100 d-none reply form-group" id={id}>
          <a className="bg-success white-text reply-target">@{user}</a>
          <input
            type="text"
            className="form-control reply-field"
            placeholder={`Reply to ${user}...`}
            value={replyContent}
            onChange={handleReplyChange}
          />
          <button
            type="submit"
            className="text-white reply-button"
            onClick={makeReplyReq}
          >
            {!loading ? "发送" : <Loader />}
          </button>
        </div>
      </div>
      <style jsx>{`
        .reply {
          position: relative;
        }
        .reply-target {
          position: absolute;
          left: 0;
          top: -25px;
          border-radius: 30px;
        }
        .reply-field {
          box-shadow: none;
          border: 2px solid #333;
          border-radius: 30px 0px 0px 30px;
          width:82%;
          height:40px
        }
        .reply-field:focus {
          border: none;
          outline: none;
          border: 2px solid #2eca6a;
          border-color: #2eca6a;
          box-shadow: none;
        }
        .reply-field:focus + .reply-button{
          border: 1px solid #2eca6a;
          background-color:#2eca6a;
        }
        .reply-button {
          position: absolute;
          height:40px;
          background-color:#333333;
          top: 0;
          right: 0px;
          padding: 7px;
          border-radius: 0px 50px 50px 0px;
          border: 1px solid #333;
          outline: none;
          transition:background-color .3s ease,border .3s ease;
        }
      `}</style>
    </div>
  );
};

export default ReplyListItem;
