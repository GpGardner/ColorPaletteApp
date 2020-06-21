import React, { Component } from "react";
import { Link } from "react-router-dom";

import Slider from "rc-slider";
// { Range }
import "rc-slider/assets/index.css";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import "./Navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "hex",
      open: false,
    };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  handleFormatChange(e) {
    let format = e.target.value;
    this.setState({ format, open: true });
    this.props.handleChange(format);
    setTimeout(this.closeSnackbar, 3000);
  }

  closeSnackbar() {
    this.setState({ open: false });
  }
  render() {
    const { level, changeLevel, showShadesSlider } = this.props;
    const { format } = this.state;
    return (
      <header className="Navbar">
        <div className="Navbar-logo">
          <Link to="/">The Colors App</Link>
        </div>
        {showShadesSlider && (
          <div className="Navbar-slider-container">
            <span>Level: {level}</span>
            <div className="Navbar-slider">
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onAfterChange={changeLevel}
              />
            </div>
          </div>
        )}
        <div className="Navbar-select-container">
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, .1)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={3000}
          message={
            <span id="Navbar-message-id">
              Format Changed: {format.toUpperCase()}
            </span>
          }
          ContentProps={{ "aria-describedby": "Navbar-message-id" }}
          onClose={this.closeSnackbar}
          action={
            <IconButton
              onClick={this.closeSnackbar}
              color="inherit"
              key="close"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          }
        />
      </header>
    );
  }
}
