import React, { Component } from "react";

import ColorBox from "../ColorBox/ColorBox";
import "./ColorPalette.css";
import PaletteFooter from "../Footer/PaletteFooter"

import Navbar from "../Navbar/Navbar";

export default class ColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      format: "hex",
    };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
  }

  changeFormat(format) {
    this.setState({ format });
  }

  render() {

    const { colors, paletteName, emoji, id } = this.props.palette;
    const { level, format } = this.state;

    const colorBoxes = colors[level].map((color) => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.id}
        id={color.id}
        paletteId={id}
        showMoreLink
      />
    ));
    return (
      <div className="ColorPalette">
        <div className="ColorPalette-slider">
          <Navbar
            level={level}
            changeLevel={this.changeLevel}
            handleChange={this.changeFormat}
            showShadesSlider
          />
        </div>

        <div className="ColorPalette-colors">{colorBoxes}</div>

        <PaletteFooter paletteName={paletteName} emoji={emoji} />
        <div></div>
      </div>
    );
  }
}
