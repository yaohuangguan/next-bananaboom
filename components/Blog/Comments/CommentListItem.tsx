import Reply from "./Reply/Reply";
const CommentListItem = ({ user, comment, date, photoURL, id, reply, currentUser }) => {
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      {comment && (
        <div style={{ display: "flex",flexDirection:'column' }}>
          <div className='image-and-comment' style={{display:'flex'}}>
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
              className="w-100"
              style={{ display: "flex", flexFlow: "column wrap" }}
            >
              <div className="p-3">
                <div className="header mb-2" style={{display:'flex',flexDirection:'column'}}>
                  <span className="font-weight-bold">
                    {user}
                  </span>
                  <span className="text-muted" style={{justifySelf:'flex-end'}}>{date}</span>
  
                </div>
                <p>{comment}</p>
               
              </div>
            
            </div>
          </div>
          <Reply reply={reply} id={id} currentUser={currentUser}/>
        </div>
      )}
      
    </div>
  );
};

export default CommentListItem;
