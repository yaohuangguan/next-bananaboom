import ProjectListItem from "./ProjectListItem";
const ProjectList = props => {
  const { items } = props;
  return (
    <>
      <div className="row">
        {items.map(( {id, ...otherProps} ) => <ProjectListItem key={id} id={id} {...otherProps} />
        )}
      </div>
    </>
  );
};

export default ProjectList;
