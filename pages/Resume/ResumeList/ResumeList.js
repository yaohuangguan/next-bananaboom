import React from "react";
import ResumeListItem from './ResumeListItem'
const ResumeList = props => {
  const { items } = props;
  return (
    <div className='row'>
     {items.map(( {id, ...otherProps} ) => <ResumeListItem key={id} {...otherProps} id={id} />
        )}
      
    </div>
  );
};

export default ResumeList;
