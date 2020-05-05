import ProjectListItem from "./ProjectListItem";
const ProjectList = (props: { items: [] }) => {
  const { items } = props;
  return (
    <div className='project-row'>
      <div className="row project-list">
        {items &&
          items.map(
            ({
              _id,
              ...otherProps
            }: {
              _id: string;
              link: string;
              image: string;
              name: string;
              _name: string;
              info: string;
              _info: string;
            }) => <ProjectListItem key={_id} _id={_id} {...otherProps} />
          )}
      </div>
    </div>
  );
};

export default ProjectList;
