import { Card, CardContent, IconButton, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

type user = {
  username: string;
  bio: string;
  isloggedIn: boolean;
  role: string;
};

const Admin = () => {
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<user[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/users/users/`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication failed!");
      })
      .then((resObject) => {
        setUsers(resObject.entity);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const makeAdmin = (username: string) => {
    fetch(
      `http://localhost:3001/api/v1/users/users/makeadmin?username=${username}`,
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUser = (username: string) => {
    fetch(`http://localhost:3001/api/v1/users/users?username=${username}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication failed!");
      })
      .then((resObject) => {
        console.log(resObject.entity);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        {users?.map((user: user, key: number) => {
          return (
            <>
              <Card sx={{ minWidth: 275 }} key={key}>
                <CardContent>
                  <Stack direction="row" alignItems="center" gap={1}>
                    {" "}
                    <IconButton aria-label="search">
                      <RemoveCircleIcon
                        style={{ fill: "red" }}
                        onClick={() => deleteUser(user.username)}
                      />
                    </IconButton>
                    {user.username}
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    {user.role}
                    {user.role === "user" ? (
                      <IconButton aria-label="search">
                        <AddCircleIcon
                          style={{ fill: "green" }}
                          onClick={() => makeAdmin(user.username)}
                        />
                      </IconButton>
                    ) : (
                      <></>
                    )}
                  </Stack>
                </CardContent>
              </Card>

              <br />
            </>
          );
        })}
      </div>
    </>
  );
};

export default Admin;
