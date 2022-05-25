import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";

type Message = {
  id: string;
  uuid: string;
  content: string;
};

const TimeLine = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch("http://localhost/api/v1/messages/messages", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication failed!");
      })
      .then((resObject) => {
        console.log(resObject.entity);
        setMessages(resObject.entity);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
    {/* <div>{messages[1]?.uuid}</div>
    <div>{messages[1]?.content}</div> */}

      {messages?.slice(0).reverse().map((message: Message, key: number) => {
        return (
          <div key={key}>{message.content} - {message.uuid}</div>)
      })}

    </>
  );
};

export default TimeLine;