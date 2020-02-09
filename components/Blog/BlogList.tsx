import dynamic from "next/dynamic";
const BlogListItem = dynamic(() => import("../Blog/BlogListItem"), {
  ssr: false
});
const BlogList = props => {
  const { blogs } = props;
  console.log(blogs.map)
  return (
    <div className='row'>
      {blogs && blogs.map(({ _id, isPrivate, ...other }) => {
       return !isPrivate ? (<div className='col-md-6' key={_id}>
        <BlogListItem {...other} _id={_id} />
      </div>) : null
    
})}
    </div>
  );
};

export default BlogList;
