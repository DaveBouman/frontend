import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

type kweet = {
  content: string;
  name: string;
};

const SearchBar = () => {
  const [kweets, setKweets] = useState<kweet[]>([]);
  const [query, setQuery] = useState<string>("");

  const search = () => {
    fetch(
      `http://localhost:3002/api/v1/messages/messages/search?query=${query}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication failed!");
      })
      .then((resObject) => {
        console.log(resObject.entity);
        setKweets(resObject.entity);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form>
        <TextField
          onChange={(e) => setQuery(e.target.value)}
          id="search-bar"
          className="text"
          label="Search context"
          variant="outlined"
          placeholder="Search..."
          size="small"
        />
        <IconButton aria-label="search" onClick={search}>
          <SearchIcon style={{ fill: "grey" }} />
        </IconButton>
        {kweets?.map((kweet: kweet, key: number) => {
          return (
            <div key={key}>
              {kweet.content} - {kweet.name}
            </div>
          );
        })}
      </form>
    </>
  );
};

export default SearchBar;
