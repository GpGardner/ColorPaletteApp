import React, { Component } from "react";
import { Link } from "react-router-dom";

import MiniPalette from "../MiniPalette/MiniPalette";

export default class PaletteList extends Component {
  render() {
    const { palettes } = this.props;

    const palette = palettes.map((palette) => (
      <p key={palette.paletteName}>
        <Link to={`/palette/${palette.id}`}><MiniPalette palette={palette}/></Link>
      </p>
    ));

    return (
      <div>
        <h1>React Colors</h1>
        {palette}
      </div>
    );
  }
}
