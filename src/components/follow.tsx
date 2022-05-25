import { Card, CardContent, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const Follow = () => {
  const [followers, setFollowers] = useState<string[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/users/users/follows`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication failed!");
      })
      .then((resObject) => {
        setFollowers(resObject.entity);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {followers?.map((follower: string, key: number) => {
        return (
          <>
            <Card sx={{ minWidth: 275 }} key={key}>
              <CardContent>
                <Stack direction="row" alignItems="center" gap={1}>
                  {follower}
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

export default Follow;
