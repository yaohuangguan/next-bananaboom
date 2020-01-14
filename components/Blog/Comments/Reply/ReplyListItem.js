const ReplyListItem = ({ id, content, date, photoURL, user }) => {
  const showReply = e => {
    const reply = document.getElementById(id);
    reply.classList.toggle("d-none");
  };
  return (
    <div style={{ display: "flex" }}>
      <img
        src={
          photoURL
        }
        alt="avatar"
        width="30px"
        height="30px"
        className="avatar rounded-circle mt-3"
      />
      <div
        className="mb-1 w-100"
        style={{ display: "flex", flexFlow: "column wrap" }}
      >
        <div className="p-3 ">
          <div className="mb-2">
            <strong className="primary-font font-weight-bold">{user}</strong>
            <small className="pull-right text-muted">{date}</small>
            <br />
          </div>
          <p className="mb-2">{content}</p>
        </div>

        <a
          onClick={showReply}
          className="text-primary"
          style={{ alignSelf: "flex-end" }}
        >
          Reply
        </a>
        <div className="w-100 md-form m-0 d-none reply position-relative" id={id}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your public reply here..."
          />
           <button type='submit' className='btn-hover color-4 position-absolute' style={{top:0,right:'1%'}} >Reply</button>
        </div>
      </div>
    </div>
  );
};

export default ReplyListItem;
