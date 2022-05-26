import React, { useState, createContext, useEffect } from "react";

type User = {
  username: string;
  bio: string;
  isloggedIn: boolean;
  role: string;
};

export const UserContext = createContext<Partial<User | null>>(null);

const UserProvider = (props: {
  children: React.ReactChild[] | React.ReactChild | undefined;
}) => {
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:3001/api/v1/users/users/authSucces", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
          setUser((prevState) => {
            return {
              ...prevState,
              isloggedIn: true,
              theme: "light",
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
