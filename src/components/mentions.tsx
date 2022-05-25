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

function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
  const [secondary, setSecondary] = React.useState(true);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Demo>
        <List>
          {generate(
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <ArrowForwardIosIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="General kenobi" secondary="hello there " />
            </ListItem>
          )}
        </List>
      </Demo>
    </Box>
  );
}
