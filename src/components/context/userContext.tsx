import React, { useState, createContext, useEffect } from "react";

type User = {
  isLoggedIn: boolean;
  name: {
    givenName: string;
  };
  familyName: string;
  theme: string;
  language: string;
};

export const UserContext = createContext<Partial<User | null>>(null);

const UserProvider = (props: {
  children: React.ReactChild[] | React.ReactChild | undefined;
}) => {
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost/api/v1/users/google/auth/success", {
        method: "GET",
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
              isLoggedIn: true,
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
