import React, { Component } from "react";
import ColorBox from "../ColorBox/ColorBox";
import Navbar from "../Navbar/Navbar"

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state = {};
  }

  gatherShades(palette, colorToFilterBy) {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }

    return shades.slice(1);
  }

  render() {
    const renderShades = this._shades.map((color) => (
      <ColorBox
        background={color.hex}
        name={color.name}
        key={color.name}
        id={color.id}
        showMoreLink={false}
      />
    ));
    return (
      <div className="ColorPalette">
        <h1>Single Color Palette</h1>
        <div className="ColorPalette-colors">{renderShades}</div>
      </div>
    );
  }
}

export default SingleColorPalette;
