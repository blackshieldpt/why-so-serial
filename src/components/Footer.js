import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const Footer = (props) => {
  return (
    <Box sx={props.sx}>
      <Box sx={{ mx: "auto", mt: 0 }}>
        <Typography
          align="center"
          display="block"
          sx={{ color: "#555555", fontSize: "0.8em" }}
        >
          This tool is open source. Check it out on&nbsp;
          <Link
            href="https://github.com/blackshieldpt/why-so-serial"
            target="_blank"
            underline="hover"
            color="inherit"
          >
            Github.
          </Link>
        </Typography>
      </Box>
      <Box sx={{ mx: "auto", mt: 0 }}>
        <Typography
          align="center"
          display="block"
          sx={{ color: "#555555", fontSize: "0.8em" }}
        >
          Based on&nbsp;
          <Link
            href="https://github.com/spacehuhntech/espwebtool"
            target="_blank"
            underline="hover"
            color="inherit"
          >
            Esp Web Tool
          </Link>
          &nbsp;and&nbsp;
          <Link
            href="https://github.com/espressif/esptool-js"
            target="_blank"
            underline="hover"
            color="inherit"
          >
            esptool-js
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

Footer.propTypes = {
  sx: PropTypes.object,
};

export default Footer;
