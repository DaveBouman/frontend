import { Card, CardContent, Grid, Stack, IconButton } from "@mui/material";
import KweetForm from "../components/KweetForm";
import Mentions from "../components/mentions";
import SearchBar from "../components/searchBar";
import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

type kweet = {
  content: string;
  name: string;
  hearts: string;
  created: string;
};

const Home = () => {
  const [kweets, setKweets] = useState<kweet[]>([]);
  const [trends, setTrends] = useState<string[]>([]);
  const navigation = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:3002/api/v1/messages/messages/latestkweets`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication failed!");
      })
      .then((resObject) => {
        setKweets(resObject.entity);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`http://localhost:3002/api/v1/messages/messages/trends/latest/`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication failed!");
      })
      .then((resObject) => {
        console.log(resObject.entity);
        setTrends(resObject.entity);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Grid container spacing={0} direction="column" alignItems="center">
        <SearchBar />
      </Grid>
      <Grid container spacing={0} direction="column" alignItems="center">
        <KweetForm />
      </Grid>
      <Grid container spacing={0} direction="column" alignItems="center">
        <Mentions />
      </Grid>
      <div>Trends:</div>
      {trends?.map((trend: string, key: number) => {
        return (
          <>
            <Card sx={{ minWidth: 275 }} key={key}>
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                  onClick={() => navigation(`/trend/${trend.slice(1)}`)}
                >
                  {trend}
                </Stack>
              </CardContent>
            </Card>
            <br />
          </>
        );
      })}
      <br />
      own kweets:
      {kweets
        ?.slice(0)
        .reverse()
        .map((kweet: kweet, key: number) => {
          return (
            <>
              <Card sx={{ minWidth: 275 }} key={key}>
                <CardContent>
                  <Stack direction="row" alignItems="center" gap={1}>
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

export default Home;
