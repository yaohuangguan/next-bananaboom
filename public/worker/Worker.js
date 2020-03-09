onmessage = e => {
  const data = e.data;
  const { blogs, searchField } = data;

  const result =
    blogs &&
    blogs.filter(blog => {
      let temp = blog.name + blog.info + blog.tags.map(each => each);
      return temp.toLowerCase().includes(searchField.toLowerCase());
    });

  postMessage(result);
  close();
};
