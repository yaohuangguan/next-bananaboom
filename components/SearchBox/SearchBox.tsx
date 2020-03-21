const SearchBox = ({ handleChange, searchField }) => {
  return (
    <div className="text-center">
      <label htmlFor="searchBlog">
        <input
          value={searchField}
          type="search"
          className="search px-3 py-3 my-3 text-center"
          placeholder="Search Blog List"
          onChange={handleChange}
        />
      </label>
      <style jsx>{`
        .search {
          font-size: 1.1rem;
          font-weight: 300;
          display: inline-block;
          background-color: rgb(255, 252, 252);
          border-radius: 40px;
          border: 2px solid grey;
          color: "rgb(142, 61, 247)";
          box-shadow: none;
          width:50vw
        }
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
