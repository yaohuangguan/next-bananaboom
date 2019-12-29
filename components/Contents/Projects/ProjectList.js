import ProjectListItem from "./ProjectListItem";
const ProjectList = props => {
  const { items } = props;
  return (
    <>
      <div className="row">
        {items.map(( {_id, ...otherProps} ) => <ProjectListItem key={_id} _id={_id} {...otherProps} />
        )}
      </div>
    </>
  );
};

export default ProjectList;
