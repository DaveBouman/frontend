import { Card, CardContent, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

type kweet = {
  content: string;
  name: string;
  hearts: string;
  created: string;
};

const Mentions = () => {
  const [kweets, setKweets] = useState<kweet[]>([]);
  const navigation = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:3002/api/v1/messages/messages/mentions`, {
      method: "GET",
      credentials: "include",
    })
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
  }, []);
  return (
    <>
      mentions:
      {kweets
        ?.slice(0)
        .reverse()
        .map((kweet: kweet, key: number) => {
          return (
            <>
              <Card sx={{ minWidth: 275 }} key={key}>
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    onClick={() => navigation(`/user/${kweet.name}`)}
                  >
                    {kweet.name}
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    {kweet.content}
                  </Stack>
                  <IconButton aria-label="search">
                    <FavoriteIcon style={{ fill: "grey" }} />
                  </IconButton>
                  <Stack direction="row" alignItems="center" gap={1}>
                    {new Date(kweet.created).toLocaleString()}
                  </Stack>
                </CardContent>
              </Card>
              <br />
            </>
          );
        })}
    </>
  );
};

export default Mentions;
