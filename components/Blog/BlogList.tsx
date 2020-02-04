import dynamic from "next/dynamic";
const BlogListItem = dynamic(() => import("../Blog/BlogListItem"), {
  ssr: false
});
const BlogList = props => {
  const { blogs } = props;
  
  return (
    <div>
      {blogs && blogs.map(({ _id, ...other }) => (
    <BlogListItem key={_id} {...other} _id={_id} /> 
      ))}
    </div>
  );
};

export default BlogList;
