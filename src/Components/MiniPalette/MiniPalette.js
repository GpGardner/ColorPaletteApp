import React, { Component } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import "../Styles/animation.css"

import { withStyles } from "@material-ui/styles";

const styles = {
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    "&:hover svg": {
      opacity: 1,
    },
  },
  colors: {
    backgroundColor: "#dae1e4",
    height: "150px",
    width: "100%",
    borderRadius: "5px",
    overflow: "hidden",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: ".5rem",
    fontSize: "1rem",
    position: "relative",
  },
  emoji: {
    marginLeft: ".5rem",
    fontSize: "1.5rem",
  },
  miniColor: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-4px",
  },
  deleteIcon: {
    color: "white",
    backgroundColor: "red",
    width: "30px",
    height: "30px",
    borderRadius: 3,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 2,
    opacity: 0,
  },
};

class MiniPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fading: false,
    }
  }

  deleteMiniPalette = (e) => {
    e.stopPropagation();
    const { deleteMiniPalette, id } = this.props;
    this.setState({
      fading: true
    })
    setTimeout(() => {
    deleteMiniPalette(id);
    }, 500);
  }

  render() {
    const { classes, paletteName, emoji, colors, handleClick} = this.props;
    const miniColorBoxes = colors.map((color) => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      ></div>
    ));
    let styles = this.state.fading ? `${classes.root} puff-out-center`: classes.root;
    return (
      <div className={styles} onClick={handleClick}>
        <div>
          <DeleteIcon
            className={classes.deleteIcon}
            style={{
              transition: "all .3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s",
            }}
            onClick={this.deleteMiniPalette}
          />
        </div>
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
