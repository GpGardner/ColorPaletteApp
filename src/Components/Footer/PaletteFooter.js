import React from 'react'

export default function PaletteFooter(props) {
    const { paletteName, emoji } = props;
    return (
        <footer className="ColorPalette-footer">
          {paletteName}
          <span className="ColorPalette-emoji">{emoji}</span>
        </footer>
    )
}
