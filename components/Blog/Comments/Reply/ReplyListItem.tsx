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
          <p className="mb-2">{content}</p>
        </div>

        <a
          onClick={showReply}
          className="text-primary"
          style={{ alignSelf: "flex-end" }}
        >
          回复
        </a>
        <div className="w-100 m-0 d-none reply form-group" id={id}>
          <input
            type="text"
            className="form-control reply-field"
            placeholder="Enter your public reply here..."
          />
           <button type='submit' style={{borderRadius:'50px'}} className='bg-success btn-sm text-white'>回复</button>
        </div>
      </div>
      <style jsx>{`
        .reply-field{
          box-shadow: none;
          border: 2px solid #333;
          border-radius:30px
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
