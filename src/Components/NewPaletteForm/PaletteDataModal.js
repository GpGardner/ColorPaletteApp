import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
// import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

class PaletteDataModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      newPaletteName: "",
      stage: "form",
    };
  }

  // handleClickOpen = () => {
  //   this.setState({
  //     open: true,
  //   });
  // };
  //
  //   handleClose = () => {
  //     this.setState({
  //       open: false,
  //     });
  //   };

  handleTextChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  showEmojiPicker = () => {
    this.setState({
      stage: "emoji",
    });
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  savePalette = (emoji) => {
    const newPalette = {
      name: this.state.newPaletteName,
      emoji: emoji.native
    }
    this.props.handleSavePalette(newPalette);
  }

  render() {
    const { /*open, newPaletteName, */ stage } = this.state;
    const { /*handleSavePalette, */ hideForm } = this.props;
    return (
      <div>
        <Dialog open={stage === "emoji"}>
          <Picker onSelect={this.savePalette}/>
          <Button onClick={hideForm} color="secondary" variant="contained">
            Cancel
          </Button>
        </Dialog>
        <Dialog
          open={stage === "form"}
          onClose={hideForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose a Palette Name
          </DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a new name for your newly created palette. It must
                be unique!
              </DialogContentText>
              <TextValidator
                label="Palette Name"
                name="newPaletteName"
                value={this.state.newPaletteName}
                onChange={this.handleTextChange}
                fullWidth
                margin="normal"
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "Palette Name Required!",
                  "Name Already Used!!!!",
                ]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm} color="primary">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteDataModal;
