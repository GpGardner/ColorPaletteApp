import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import DraggableColorList from "./DraggableColorList";
// import { ValidatorForm } from "react-material-ui-form-validator";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";

//TODO: put drawerwidth in a variables file
const drawerWidth = 400;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    alignItems: "center"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    width: "100%",
  },
  button: {
    width: "50%",
  },
});

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20,
  };
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      // currentColor: "teal",
      // newColorName: "",
      colors: this.props.palettes[0].colors,
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addNewColor = (newColor) => {
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: "",
    });
  };

  handleTextChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSavePalette = (newPalette) => {
    const { colors } = this.state;
    const newPaletteId = newPalette.name.toLowerCase().replace(/ /g, "-");
    // newColorName.split(' ').join('-').toLowerCase();

    const newCreatedPalette = {
      paletteName: newPalette.name,
      colors: colors,
      id: newPaletteId,
      emoji: newPalette.emoji,
    };
    this.props.savePalette(newCreatedPalette);
    this.props.history.push("/");
  };

  removeColorBox = (boxName) => {
    let newColors = this.state.colors.filter((color) => color.name !== boxName);
    this.setState({
      colors: newColors,
    });
  };

  clearPalette = () => {
    this.setState({
      colors: [],
    });
  };

  addRandomColor = () => {
    const allColors = this.props.palettes.map((p) => p.colors).flat();
    let randomNumber = Math.floor(Math.random() * 100);
    let randomlyPickedColor = allColors[randomNumber];
    this.setState({
      colors: [...this.state.colors, randomlyPickedColor],
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const paletteIsFull = colors.length >= maxColors;

    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSavePalette={this.handleSavePalette}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>Design your palette</Typography>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                disabled={paletteIsFull}
                onClick={this.addRandomColor}
                className={classes.button}
              >
                {paletteIsFull ? "Palette Full" : "Random Color"}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.clearPalette}
                className={classes.button}
              >
                Clear Palette
              </Button>
            </div>
            <ColorPickerForm
              paletteIsFull={paletteIsFull}
              addNewColor={this.addNewColor}
              colors={colors}
            />
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={colors}
            removeColorBox={this.removeColorBox}
            axis="xy"
            onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
