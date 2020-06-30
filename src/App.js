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
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {
      palettes: savedPalettes,
    };
  }

  componentDidMount(){
    if(this.state.palettes < 1 ){
      this.setState({ palettes: seedColors})
    }
  }

  findPalette(id) {
    return this.state.palettes.find((palette) => {
      return palette.id === id;
    });
  }

  savePalette = (newPalette) => {
    this.setState(
      {
        palettes: [...this.state.palettes, newPalette],
      },
      this.syncLocalStorage
    );
  };

  deleteMiniPalette = (id) => {
    this.setState(
      (state) => (
        { palettes: state.palettes.filter((palette) => palette.id !== id) }),
        this.syncLocalStorage
    );
  };

  syncLocalStorage = () => {
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/new/palette"
          render={(routeProps) => (
            <NewPaletteForm
              savePalette={this.savePalette}
              palettes={this.state.palettes}
              {...routeProps}
            />
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
            <PaletteList
              palettes={this.state.palettes}
              deleteMiniPalette={this.deleteMiniPalette}
              {...routeProps}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
