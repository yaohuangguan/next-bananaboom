import ProjectListItem from "./ProjectListItem";
const ProjectList = props => {
  const { items } = props;
  return (
    <>
      <div className="row mx-auto mt-2">
        {items.map(( {id, ...otherProps} ) => <ProjectListItem key={id} id={id} {...otherProps} />
        )}
      </div>
    </>
  );
};

export default ProjectList;
