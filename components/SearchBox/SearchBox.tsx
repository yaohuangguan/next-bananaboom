import "./searchbox.scss";
const SearchBox = ({
  handleChange,
  searchField,
  blogs,
  searchSuggestion,
  theme
}) => {
  const suggests = blogs.map(blog =>
    [blog.name].concat([...blog.tags.map(each => each)]).concat([blog.info])
  );
  let color = theme();
  const getSuggestion = () => {
    if (!searchField) return;
    let arrayHasDouble = suggests
      .map(
        suggest =>
          suggest.length > 0 &&
          suggest.filter(
            each =>
              each.length > 0 &&
              each.toLowerCase().startsWith(searchField.toLowerCase())
          )
      )
      .join(",")
      .split(",")
      .filter(each => each.length > 0);
    let set = Array.from(new Set(arrayHasDouble));
    return (
      <ul className="suggestion-list">
        {set.map((each, index) => (
          <li
            key={index}
            className="suggestion-item"
            onClick={searchSuggestion}
          >
            {each}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="search-container text-center px-3 py-3">
      <label htmlFor="searchBlog">
        <input
          value={searchField}
          type="search"
          className="search p-3"
          placeholder="通过关键词搜索"
          onChange={handleChange}
          style={{ color: `${color == "night" ? "#fff" : "#333"}` }}
        />
      </label>
      {getSuggestion()}
    </div>
  );
};

export default SearchBox;
