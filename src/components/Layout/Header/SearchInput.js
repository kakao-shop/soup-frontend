import classes from "./SearchInput.module.css";

const SearchInput = (props) => {
  return (
    <div className={classes.search}>
      <input type="text" className={classes["search-input"]} />
      <button className={classes["search-btn"]}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/search.png`}
          alt="Search Button Icon"
        />
      </button>
    </div>
  );
};

export default SearchInput;
