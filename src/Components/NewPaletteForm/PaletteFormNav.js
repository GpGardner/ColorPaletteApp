import React, { Component } from "react";
import { Link } from "react-router-dom";
import PaletteDataModal from "./PaletteDataModal";
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import styles from "../Styles/PaletteFormNavStyles";

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formShowing: false,
    };
  }

  showForm = () => {
    this.setState({
      formShowing: true,
    });
  };

  hideForm = () => {
    this.setState({
      formShowing: false,
    });
  };

  render() {
    const {
      classes,
      open,
      handleSavePalette,
      handleDrawerOpen,
      palettes,
    } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          color="default"
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <AddIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Create A New Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
            <Link to="/">
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Go Back
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              onClick={this.showForm}
              className={classes.button}
            >
              Save
            </Button>
          </div>
        </AppBar>
        {this.state.formShowing && (
          <PaletteDataModal
            handleSavePalette={handleSavePalette}
            hideForm={this.hideForm}
            palettes={palettes}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
