import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/context/userContext";
import TextField from "@mui/material/TextField";
import { Button, Card, CardContent, IconButton, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import RemoveCircleIcon from "@mui/icons-material/AddCircle";

type kweet = {
  content: string;
  name: string;
};

type user = {
  username: string;
  bio: string;
  isloggedIn: boolean;
  role: string;
  follows: user[];
  following: user[];
};

const Profile = () => {
  const userContext = useContext(UserContext);
  const [bio, setBio] = useState<string>();
  const [kweets, setKweets] = useState<kweet[]>([]);
  const [userToFollow, setUserToFollow] = useState<string>("");
  const [user, setUser] = useState<user>();
  const [followers, setFollowers] = useState<string[]>();
  const [following, setFollowing] = useState<string[]>();
  const navigation = useNavigate();
  useEffect(() => {
    setBio(userContext?.bio);

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `http://localhost:3001/api/v1/users/users/user?username=${userContext?.username}`,
      requestOptions
    )
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication failed!");
      })
      .then((resObject) => {
        console.log(resObject);
        setUser(resObject.entity);
      });

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
  }, []);

  const updateBio = () => {
    fetch("http://localhost:3001/api/v1/users/users/bio", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify({
        bio: bio,
      }),
    });
  };

  const followUser = () => {
    fetch(
      `http://localhost:3001/api/v1/users/users/followers?username=${userToFollow}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          bio: bio,
        }),
      }
    );
  };

  const unfollow = (username: string) => {
    fetch(
      `http://localhost:3001/api/v1/users/users/followers?username=${username}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          bio: bio,
        }),
      }
    );
  };

  return (
    <>
      <div> username: {userContext?.username}</div>
      <div>
        Bio:
        <TextField
          placeholder="User bio"
          multiline
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          inputProps={{ maxLength: 140 }}
          rows={4}
        />
        <Button variant="contained" onClick={updateBio}>
          Update Bio
        </Button>
      </div>
      <div>
        follow
        <TextField
          placeholder="user to follow"
          multiline
          value={userToFollow}
          onChange={(e) => setUserToFollow(e.target.value)}
          inputProps={{ maxLength: 140 }}
          rows={1}
        />
        <Button variant="contained" onClick={followUser}>
          Update Bio
        </Button>
      </div>
      <>Kweets: </>
      {kweets?.map((kweet: kweet, key: number) => {
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
              </CardContent>
            </Card>
            <br />
          </>
        );
      })}
      <div>Following:</div>
      {user?.following.map((uu: user, key: number) => {
        return (
          <>
            <Card sx={{ minWidth: 275 }} key={key}>
              <CardContent>
                <IconButton aria-label="search">
                  <RemoveCircleIcon
                    style={{ fill: "red" }}
                    onClick={() => unfollow(uu.username)}
                  />
                </IconButton>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                  onClick={() => navigation(`/user/${uu.username}`)}
                >
                  {uu.username}
                </Stack>
              </CardContent>
            </Card>
            <br />
          </>
        );
      })}
      <div>Followers:</div>
      {user?.follows.map((uu: user, key: number) => {
        return (
          <>
            <Card
              sx={{ minWidth: 275 }}
              key={key}
              onClick={() => navigation(`/user/${uu.username}`)}
            >
              <CardContent>
                <Stack direction="row" alignItems="center" gap={1}>
                  {uu.username}
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

export default Profile;
