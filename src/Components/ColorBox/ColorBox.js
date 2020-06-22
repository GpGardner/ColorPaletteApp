import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withStyles } from "@material-ui/styles";
import "./ColorBox.css";
import chroma from "chroma-js";
import { Link } from "react-router-dom";

const styles = {
  copyText: {
    color: "purple"
  },




  toDarkifLight: {
    color: props => chroma(props.background).luminance() >= 0.65 ? "black" : "white",
  },
  toLightifDark: {
    color: props => chroma(props.background).luminance() <= 0.55 ? "white" : "rgba(0,0,0,0.7)"
  }
};

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };

    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }

  render() {
    const { name, background, id, paletteId, showMoreLink, classes } = this.props;
    const { copied } = this.state;
    // const isDarkColor = chroma(background).luminance() <= 0.085;
    // const isLightColor = chroma(background).luminance() >= 0.65;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className="ColorBox">
          <div
            style={{ background }}
            className={`ColorBox-overlay ${copied && "show"}`}
          />
          <div className={`ColorBox-copyMsg ${copied && "show"}`}>
            <h1>Copied</h1>
            <p className={classes.toDarkifLight}>{background}</p>
          </div>
          <span className={`ColorBox-copy ${classes.toLightifDark}`}>
            Copy
          </span>
          <span className={`ColorBox-name ${classes.toLightifDark}`}>
            {name} {chroma(background).luminance().toFixed(3)}
          </span>
          {showMoreLink && (
            <Link
              to={`/palette/${paletteId}/${id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className={`ColorBox-more ${classes.toLightifDark}`}>
                more
              </span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
