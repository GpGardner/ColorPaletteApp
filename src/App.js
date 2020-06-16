import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";

import "./App.css";

import ColorPalette from "./Components/ColorPalette/ColorPalette";
import seedColors from "./Components/seedColors";
import { generatePalette } from "./colorHelpers";

import PaletteList from "./Components/PaletteList/PaletteList";

class App extends Component {
  findPalette(id) {
    return seedColors.find((palette) => {
      console.log(palette);
      return palette.id === id;
    });
  }

  render() {
    console.log(seedColors);
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList palettes={seedColors} {...routeProps} />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => (
            <ColorPalette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
