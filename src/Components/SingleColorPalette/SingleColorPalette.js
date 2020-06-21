import React, { Component } from "react";
import ColorBox from "../ColorBox/ColorBox";
import Navbar from "../Navbar/Navbar";
import PaletteFooter from "../Footer/PaletteFooter";

import { Link } from "react-router-dom";

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state = {
      format: "hex",
    };
    this.changeFormat = this.changeFormat.bind(this);
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

  renderShades() {
    const { format } = this.state;
    return this._shades.map((color) => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.name}
        id={color.id}
        showMoreLink={false}
      />
    ));
  }

  changeFormat(format) {
    this.setState({ format });
  }

  render() {
    const { paletteName, emoji, id } = this.props.palette;
    return (
      <div className="SingleColorPalette ColorPalette">
        <Navbar handleChange={this.changeFormat} showShadesSlider={false} />
        <div className="ColorPalette-colors">
          {this.renderShades()}
          <div className="go-back ColorBox">
            <Link
              to={`/palette/${id}`}
              className="SingleColorPalette-backButton"
            >
              Go Back
            </Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default SingleColorPalette;
