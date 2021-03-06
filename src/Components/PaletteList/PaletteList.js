import React, { Component } from "react";
import MiniPalette from "../MiniPalette/MiniPalette";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

const styles = {
  root: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    "& a": {
      color: "white"
    }
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3,30%)",
    gridGap: "5%",
  },
};

class PaletteList extends Component {
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }

  deleteMiniPalette = () => {
    this.setState(st => console.log(st)

    )
  }

  render() {
    const { palettes, classes, deleteMiniPalette } = this.props;

    const palette = palettes.map((palette) => (
      <MiniPalette
        {...palette}
        handleClick={() => this.goToPalette(palette.id)}
        key={palette.id}
        id={palette.id}
        deleteMiniPalette={deleteMiniPalette}
      />
    ));

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
            <Link to="/new/palette" className={classes.link}>Create new palette</Link>
          </nav>
          <div className={classes.palettes}>{palette}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
