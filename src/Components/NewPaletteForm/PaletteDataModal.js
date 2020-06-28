import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator"
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class PaletteDataModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      newPaletteName: "",
    };
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleTextChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  render() {
    const { open, newPaletteName } = this.state;
    const { handleSavePalette } = this.props;
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Open form dialog
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <ValidatorForm onSubmit={() => handleSavePalette(newPaletteName)}>
              <TextValidator
                label="Palette Name"
                name="newPaletteName"
                value={this.state.newPaletteName}
                onChange={this.handleTextChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "Palette Name Required!",
                  "Name Already Used!!!!",
                ]}
              />
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </ValidatorForm>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default PaletteDataModal;
