import dynamic from "next/dynamic";
const BlogListItem = dynamic(() => import("./BlogListItem"), {
  ssr: false,
});
const BlogList = ({
  handleTheme,
  blogs,
}: {
  handleTheme: () => {};
  blogs: any[];
}) => {
  return (
    <div className="row">
      {blogs &&
        blogs.map(({ _id, isPrivate, ...other }: any) => {
          return (
            !isPrivate && (
              <div className="col-md-6" key={_id}>
                <BlogListItem {...other} _id={_id} handleTheme={handleTheme} />
              </div>
            )
          );
        })}
    </div>
  );
};

export default BlogList;
