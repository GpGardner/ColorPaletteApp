This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Color Palette App

This is a react project created to allow a user to compare colors, and see how colors will interact with eachother.

## Deployed at :

https://colorpickerapp.netlify.app/
TODO: Mobile friendly, bug with new colors, prevent duplicate random colors

### "Home"

Here a user can see all the different palettes currently stored in state. Each palette is a minifid verison of itself to allow the user to preview the available colors. Clicking on each palette takes you to a specific page for each - /palette/{name}. This will eventually use a get request to pull in the data specific to each user.

Clicking create new palette will take you to /new/palette

### "/palette/{name}"

This page allows a user to see the full version of their palette.

Using the slider in the top bar, a user can adjust the "shade" to try lighter or darker variations of all of the colors in the palette.

Each "color box" can be clicked on to copy the hex code to easily use the color elsewhere. Clicking the more button takes the user to /palette/{name}/{color}

Hex can also be changed using the drop down menu to rgb, and rgba.

### "/palette/{name}/{color}"

Here a user can see 9 different shades of the selected color they picked. For example: in a palette called "material-ui" if you choose red, it select 9 different variants of red from a scale of 100-900. Going from lightest to darkest. Each box can be used to copy the hex code of the colors

Hex can also be changed using the drop down menu to rgb, and rgba.

### "/new/palette"

This is where someone can create a customized palette with up to 20 colors. User must specify a palette name at the top before submitting, this name also must not be the same as palettes already stored.

The user can open the drawer on the left and use the color picker to select a color. Then they must select a new name and use the button to add the color to the palette.

On save palette the custom palette will be added to the "/" home page
