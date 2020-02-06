import dynamic from "next/dynamic";
const BlogListItem = dynamic(() => import("../Blog/BlogListItem"), {
  ssr: false
});
const BlogList = props => {
  const { blogs } = props;
  
  return (
    <div className='row'>
      {blogs && blogs.map(({ _id, ...other }) => (
    <div className='col-md-6'>
      <BlogListItem key={_id} {...other} _id={_id} /> 
    </div>
      ))}
    </div>
  );
};

export default BlogList;
