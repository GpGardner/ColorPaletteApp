import React from 'react';

import './App.css';

import ColorPalette from "./Components/ColorPalette"
import seedColors from "./Components/seedColors"
import {generatePalette} from "./colorHelpers";

function App() {
  return (
    <div className="App">
      <ColorPalette palette={generatePalette(seedColors[4])}/>
    </div>
  );
}

export default App;
