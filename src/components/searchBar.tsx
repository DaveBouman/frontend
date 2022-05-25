import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const SearchBar = () => (
  <form>
    <TextField
      id="search-bar"
      className="text"
      label="Search context"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "grey" }} />
    </IconButton>
  </form>
);

export default SearchBar;
