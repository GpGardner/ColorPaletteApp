import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";
import styles from "../Styles/ColorPickerFormStyles";

//TODO: FIX BUG WHERE COLOR SAYS ALREADY CHOOSEN

class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "Orange",
      newColorName: "",
    };
  }

  updateCurrentColor = (newColor) => {
    this.setState({ currentColor: newColor.hex });
  };

  handleTextChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  addNewColor = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName,
    };

    this.props.addNewColor(newColor);
    this.setState({
      newColorName: "",
    });
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );

    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    );
  }

  render() {
    const { paletteIsFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
          className={classes.picker}
        />
        <ValidatorForm onSubmit={this.addNewColor}>
          <TextValidator
            label="Color Name"
            value={newColorName}
            className={classes.colorNameInput}
            name="newColorName"
            variant="filled"
            margin="normal"
            onChange={this.handleTextChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "this field is required",
              "that color name is already taken",
              "you already have choosen that color!",
            ]}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={paletteIsFull}
            className={classes.addColor}
            style={paletteIsFull ? {} : { backgroundColor: currentColor }}
          >
            {paletteIsFull ? "Palette Full" : "Add Color!"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
