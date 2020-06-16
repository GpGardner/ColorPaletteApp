import React, { Component } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";
import "./ColorBox.css";

export default class ColorBox extends Component {
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
    const { name, background } = this.props;
    const { copied } = this.state;
    
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className="ColorBox">
          <div
            style={{ background }}
            className={`ColorBox-overlay ${copied && "show"}`}
          />
          <div className={`ColorBox-copyMsg ${copied && "show"}`}>
            <h1>Copied</h1>
            <p>{background}</p>
          </div>
          <span className="ColorBox-copy">Copy</span>
          <span className="ColorBox-name">{name}</span>
          <span className="ColorBox-more">more</span>
        </div>
      </CopyToClipboard>
    );
  }
}
