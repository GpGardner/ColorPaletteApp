import React, { Component } from "react";
import ColorBox from "../ColorBox/ColorBox";
import Navbar from "../Navbar/Navbar";
import PaletteFooter from "../Footer/PaletteFooter"

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
    const {format} = this.state;
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
    const { paletteName, emoji } = this.props.palette
    console.log(paletteName)
    return (
      <div className="ColorPalette">
        <Navbar handleChange={this.changeFormat} showShadesSlider={false} />
        <div className="ColorPalette-colors">{this.renderShades()}</div>
        <div>Go Back</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji}/>
      </div>
    );
  }
}

export default SingleColorPalette;
