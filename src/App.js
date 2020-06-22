import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";

import "./App.css";

import SingleColorPalette from "./Components/SingleColorPalette/SingleColorPalette";
import ColorPalette from "./Components/ColorPalette/ColorPalette";
import seedColors from "./Components/seedColors";
import { generatePalette } from "./colorHelpers";
import PaletteList from "./Components/PaletteList/PaletteList";
import NewPaletteForm from "./Components/NewPaletteForm/NewPaletteForm";

class App extends Component {
  findPalette(id) {
    return seedColors.find((palette) => {
      return palette.id === id;
    });
  }

  render() {
    return (
      <Switch>
        <Route exact path="/new/palette" render={(routeProps)=> (<NewPaletteForm />)}/>
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
        <Route
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList palettes={seedColors} {...routeProps} />
          )}
        />
      </Switch>
    );
  }
}

export default App;
