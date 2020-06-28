import React from "react";
import {SortableElement} from "react-sortable-hoc"
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "../Styles/DraggableColorBoxStyles"

const DraggableColorBox = SortableElement((props) => {
  const { classes, name, color } = props;

  const handleDeleteColorBox = () => {
    props.removeColorBox(name);
  }

  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleDeleteColorBox}/>
      </div>
    </div>
  );
})

export default withStyles(styles)(DraggableColorBox);
