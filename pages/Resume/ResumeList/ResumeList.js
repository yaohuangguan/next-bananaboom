import ResumeListItem from "./ResumeListItem";
const ResumeList = ({ items }) => {
  return (
    <div className="row">
      {items ? items.map(({ _id, ...other }) => (
        <ResumeListItem key={_id} _id={_id} {...other} />
      )) : null}
    </div>
  );
};

export default ResumeList;
