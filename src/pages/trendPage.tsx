import { Card, CardContent, Stack, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
type kweet = {
  content: string;
  name: string;
  hearts: string;
  created: string;
};

const TrendPage = () => {
  const [kweets, setKweets] = useState<kweet[]>([]);
  const navigation = useNavigate();
  let params = useParams();
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `http://localhost:3002/api/v1/messages/messages/trends/?trend=${params.trend}`,
      requestOptions
    )
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication failed!");
      })
      .then((resObject) => {
        setKweets(resObject.entity);
      });
  }, [params]);

  return (
    <>
      Trends:
      {kweets?.map((kweet: kweet, key: number) => {
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

export default TrendPage;
