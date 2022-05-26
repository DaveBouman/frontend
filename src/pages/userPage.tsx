import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type User = {
  username: string;
  bio: string;
  isloggedIn: boolean;
  role: string;
};

const UserPage = () => {
  const [user, setUser] = useState<User>();

  let params = useParams();
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `http://localhost:3001/api/v1/users/users/user?username=${params.username}`,
      requestOptions
    )
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication failed!");
      })
      .then((resObject) => {
        setUser(resObject.entity);
      });
  }, [params]);

  return (
    <>
      <div>username: {user?.username}</div>
      <div>bio: {user?.bio}</div>
    </>
  );
};

export default UserPage;
