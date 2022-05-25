import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/context/userContext";
import TextField from "@mui/material/TextField";
import { Button, Card, CardContent, IconButton, Stack } from "@mui/material";

type kweet = {
  content: string;
  name: string;
};

const Profile = () => {
  const userContext = useContext(UserContext);
  const [bio, setBio] = useState<string>();
  const [kweets, setKweets] = useState<kweet[]>([]);

  useEffect(() => {
    setBio(userContext?.bio);

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
  return (
    <>
      <div> username: {userContext?.username}</div>
      <div>
        Bio:{" "}
        <TextField
          placeholder="User bio"
          multiline
          onChange={(e) => setBio(e.target.value)}
          inputProps={{ maxLength: 140 }}
          rows={4}
        />
        <Button variant="contained" onClick={postMessage}>
          Update Bio
        </Button>
      </div>
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
      <div>Followers:</div>
    </>
  );
};

export default Profile;
