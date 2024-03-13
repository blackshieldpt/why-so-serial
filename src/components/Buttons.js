import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/CancelPresentation";

const Buttons = (props) => {
  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Grid item>
        <Button
          color="primary"
          variant="contained"
          onClick={props.erase}
          disabled={props.disabled}
          endIcon={<ClearIcon />}
        >
          Erase
        </Button>
      </Grid>

      <Grid item>
        <Button
          color="primary"
          variant="contained"
          onClick={props.program}
          disabled={props.disabled}
          endIcon={<SendIcon />}
        >
          Program
        </Button>
      </Grid>
    </Grid>
  );
};

Buttons.propTypes = {
  erase: PropTypes.func,
  program: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Buttons;
