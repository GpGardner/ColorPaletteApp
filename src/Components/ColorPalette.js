import React, { Component } from "react";

import ColorBox from "./ColorBox";
import "./ColorPalette.css";

import Navbar from "./Navbar";

export default class ColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
    };
    this.changeLevel = this.changeLevel.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
  }

  render() {
    const { colors } = this.props.palette;
    const { level } = this.state;

    const colorBoxes = colors[level].map((color) => (
      <ColorBox background={color.hex} name={color.name} key={color.name} />
    ));
    return (
      <div className="ColorPalette">
        <div className="ColorPalette-slider">
          <Navbar level={level} changeLevel={this.changeLevel}/>
        </div>
        {/* Navbar goes here */}
        <div className="ColorPalette-colors">{colorBoxes}</div>
        {/* footer goes here */}
        <div></div>
      </div>
    );
  }
}
