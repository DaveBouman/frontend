import { Card, CardContent, TextField, Stack, IconButton } from "@mui/material";
import Draggable from "react-draggable";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import AddIcon from "@mui/icons-material/Add";

const DraggableBox = ({ id, x, y }: { id: string; x: number; y: number }) => {
  const updateXarrow = useXarrow();
  return (
    /* @ts-ignore */
    <Draggable
      onDrag={updateXarrow}
      onStop={updateXarrow}
      defaultPosition={{ x: x, y: y }}
    >
      <div id={id}>
        {id}
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Stack direction="row" alignItems="center" gap={1}>
              <TextField
                placeholder="Create Kweet"
                multiline
                inputProps={{ maxLength: 150 }}
                rows={4}
                maxRows={4}
              />
            </Stack>
            <IconButton aria-label="Add">
              <AddIcon />
            </IconButton>
          </CardContent>
        </Card>
      </div>
    </Draggable>
  );
};

function Grid() {
  return (
    <div
      style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}
    >
      <Xwrapper>
        <DraggableBox id={"elem4"} x={15} y={2} />
        <DraggableBox id={"elem1"} x={15} y={200} />
        <DraggableBox id={"elem2"} x={15} y={400} />
        <DraggableBox id={"elem3"} x={15} y={600} />
        <Xarrow start={"elem1"} end={"elem2"} />
        <Xarrow start={"elem2"} end={"elem3"} />
      </Xwrapper>
    </div>
  );
}
export default Grid;
