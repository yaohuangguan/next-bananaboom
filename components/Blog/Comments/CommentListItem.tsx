import Reply from "./Reply/Reply";
import Image from 'next/image'
export interface ICommentListItemProps {
  user:string;
  _userid:string;
  comment:string;
  date:string;
  photoURL:string;
  id:string;
  reply:string;
  currentUser:any
}
const CommentListItem = ({ user, _userid, comment, date, photoURL, id, reply, currentUser }:ICommentListItemProps) => {
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      {comment && (
        <div style={{ display: "flex",flexDirection:'column' }}>
          <div className='image-and-comment' style={{display:'flex'}}>
            <Image
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
                <div className="header" style={{display:'flex',flexDirection:'column'}}>
                  <span className="font-weight-bold">
                    {user}
                  </span>
                  <span className="text-muted" style={{justifySelf:'flex-end'}}>{date}</span>
  
                </div>
                <span>{comment}</span>
                <Reply reply={reply} user_id={_userid} comment_id={id} currentUser={currentUser} />
              </div>
             
            </div>
            
          </div>
         
        </div>
      )}
      
    </div>
  );
};

export default CommentListItem;
