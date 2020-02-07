const style = {
  boxShadow: "none",
  borderRadius: "50px",
  width: "50vw",
  color: "rgb(142, 61, 247)"
};
const SearchBox = ({ handleChange, searchField }) => {
  return (
    <div className="text-center">
      <label htmlFor="searchBlog">
        <input
          value={searchField}
          type="search"
          className="search px-3 py-3 my-3 text-center"
          placeholder="Search"
          onChange={handleChange}
          style={style}
        />
      </label>
      <style jsx>{`
        .search:focus {
          border: none;
          outline: none;
          border: 2px solid rgb(142, 61, 247);
          border-color: rgb(142, 61, 247);
          box-shadow: none;
        }
      `}</style>
    </div>
  );
};

export default SearchBox;
