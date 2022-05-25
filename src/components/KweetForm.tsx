import React, { useContext, useState } from "react";
import { Card, CardContent, Stack, TextField, Button } from "@mui/material";
import { fetchRequest } from "../utils/fetchRequest";
import { UserContext } from "./context/userContext";

const KweetForm: React.FC = () => {
  const [content, setContent] = useState<string>();
  const userContext = useContext(UserContext);

  const postMessage = () => {
    fetch("http://localhost/api/v1/messages/messages", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify({
        name: userContext?.name,
        content: content,
      }),
    });
  };
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" gap={1}>
          <TextField
            placeholder="Create Kweet"
            multiline
            onChange={e => setContent(e.target.value)}
            inputProps={{ maxLength: 140 }}
            rows={4}
          />
        </Stack>
        <Button variant="contained" onClick={postMessage}>
          Kweet it!
        </Button>
      </CardContent>
    </Card>
  );
};

export default KweetForm;
