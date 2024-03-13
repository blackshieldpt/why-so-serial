import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Grid";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import ChromeIcon from "../icons/Chrome";
import EdgeIcon from "../icons/Edge";
import OperaIcon from "../icons/Opera";
import SettingsIcon from "@mui/icons-material/Settings";
import ConnectIcon from "@mui/icons-material/Cable";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Home = (props) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        {props.supported() ? (
          <Box align="center">
            <Box>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={props.connect}
                sx={{ px: 5, py: 1, m: 2, fontSize: "1.1em" }}
                endIcon={<ConnectIcon />}
              >
                Connect
              </Button>
            </Box>
            <Box>
              <Button
                size="small"
                color="primary"
                onClick={props.openSettings}
                sx={{ mb: 3 }}
                endIcon={<SettingsIcon />}
              >
                Settings
              </Button>
            </Box>

            <Card
              sx={{
                minWidth: 275,
                bgcolor: "#333333",
                color: "#AAAAAA",
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: 14, textAlign: "left" }}>
                  <ul
                    style={{
                      listStyle: "none",
                      paddingTop: "10px",
                      paddingInline: "10px",
                      margin: 0,
                    }}
                  >
                    <li>1. Click on Connect</li>
                    <li>2. Plug in your ESP & select the port</li>
                    <li>
                      3. Import your zip file or add the .bin files and set the
                      offset addresses
                    </li>
                    <li>4. Click Program to flash it</li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ) : (
          <Alert severity="warning">
            <AlertTitle>
              Your browser doesn&apos;t support Web Serial 😭
            </AlertTitle>
            Try using&nbsp;
            <a href="https://www.google.com/chrome/" target="blank">
              <ChromeIcon fontSize="inherit" /> <b>Chrome</b>
            </a>
            ,&nbsp;
            <a href="https://www.microsoft.com/en-us/edge" target="blank">
              <EdgeIcon fontSize="inherit" /> <b>Edge</b>
            </a>
            , or&nbsp;
            <a href="https://www.opera.com/" target="blank">
              <OperaIcon fontSize="inherit" /> <b>Opera</b>
            </a>
            <br />
            (IOS & Android browsers are not supported)
            <br />
            <br />
            Learn more about&nbsp;
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Serial#browser_compatibility"
              target="blank"
            >
              browser compatibility
            </a>
          </Alert>
        )}
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  connect: PropTypes.func,
  supported: PropTypes.func,
  openSettings: PropTypes.func,
};

export default Home;
