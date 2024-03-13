import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LogoIcon from "@mui/icons-material/Downloading";

const Header = (props) => {
  return (
    <AppBar
      position="static"
      sx={{
        ...props.sx,
        background: "hsl(0, 0%, 100%)",
      }}
    >
      <Toolbar>
        <LogoIcon
          sx={{
            color: "#333333",
          }}
        />

        <Typography
          variant="h6"
          component="h1"
          noWrap
          sx={{
            flexGrow: 1,
            fontFamily: "Arial",
            color: "#333333",
            fontSize: "1.2em",
          }}
        >
          &nbsp;Why So Serial?
        </Typography>

        <Button
          sx={{ color: "#222222" }}
          href="https://blackshield.pt/"
          target="_blank"
          endIcon={<OpenInNewIcon />}
        >
          Blackshield
        </Button>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
