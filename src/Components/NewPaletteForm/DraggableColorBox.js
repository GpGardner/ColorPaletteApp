import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
  root: {
    height: "25%",
    width: "20%",
  },
};

function DraggableColorBox(props) {
  return (
    <div
      className={props.classes.root}
      style={{ backgroundColor: props.color }}
    >
      {props.color}
    </div>
  );
}

export default withStyles(styles)(DraggableColorBox);
