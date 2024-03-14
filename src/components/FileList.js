import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import UploadIcon from "@mui/icons-material/Upload";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpIcon from "@mui/icons-material/HelpOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import JSZip from "jszip";
import Tooltip from "@mui/material/Tooltip";

import styles from "./FileList.module.css";

import { defaultFiles, saveFiles } from "../lib/esp";

const FileList = (props) => {
  const addFile = () => {
    props.setUploads([
      ...props.uploads,
      {
        offset: 0,
      },
    ]);
  };

  const uploadZipFile = (evt) => {
    async function handleFile(f) {
      const newUploads = [];
      const promises = [];

      const zip = await JSZip.loadAsync(f);
      zip.forEach(function (relativePath, zipEntry) {
        const nameParts = /^0x([0-9A-Fa-f]+)_(.+\.bin)$/i.exec(zipEntry.name);
        if (nameParts != null && nameParts?.length && nameParts?.length === 3) {
          newUploads.push({
            fileName: nameParts[2],
            offset: nameParts[1],
            obj: null,
          });
          promises.push(zip.file(zipEntry.name).async("blob"));
        }
      });

      Promise.all(promises).then(function (data) {
        data.forEach((item, index) => {
          newUploads[index] = {
            ...newUploads[index],
            obj: item,
          };
        });
      });
      saveFiles(newUploads);
      props.setUploads(newUploads);
    }
    var files = evt.target.files;
    for (var i = 0; i < files.length; i++) {
      handleFile(files[i]);
    }
  };

  const reset = () => {
    const newUploads = defaultFiles(props.chipName);
    saveFiles(newUploads);
    props.setUploads(newUploads);
  };

  const uploadFile = (e, i) => {
    const newUploads = [...props.uploads];

    newUploads[i] = {
      ...newUploads[i],
      fileName: e.target.files[0].name,
      obj: e.target.files[0],
    };

    saveFiles(newUploads);
    props.setUploads(newUploads);
  };

  const setOffset = (index, newOffset) => {
    const newUploads = [...props.uploads];
    newUploads[index] = {
      ...props.uploads[index],
      offset: newOffset,
    };

    saveFiles(newUploads);
    props.setUploads(newUploads);
  };

  const deleteFile = (index) => {
    const file = props.uploads[index];
    const newUploads = [...props.uploads];

    if (file.fileName) {
      newUploads[index] = {
        ...newUploads[index],
        fileName: undefined,
        obj: undefined,
      };
    } else {
      newUploads.splice(index, 1);
    }

    saveFiles(newUploads);
    props.setUploads(newUploads);
  };

  const onlyHex = (e) => {
    const re = /[0-9a-fA-F]+/g;
    if (!re.test(e.key)) e.preventDefault();
  };

  return (
    <Box textAlign="center" className={styles.box}>
      <Grid container spacing={0}>
        <Grid item xs={12} textAlign={"right"}>
          <Button
            color="primary"
            component="label"
            endIcon={<DriveFolderUploadIcon />}
          >
            Import ZIP File
            <input
              type="file"
              hidden
              accept=".zip"
              onChange={(e) => uploadZipFile(e)}
            />
          </Button>
          <Tooltip title="You can use the 'pio2zip' python tool to create a zip file with all the files and offsets from any Platformio build.  (https://pypi.org/project/pio2zip)">
            <IconButton size="small" color="primary" component="label">
              <HelpIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      {props.uploads.map((file, i) => (
        <Grid container spacing={0} className={styles.fileItem} key={i}>
          {/* Offset */}
          <Grid item xs={2} className={styles.fileOffset}>
            <TextField
              label="0x"
              variant="outlined"
              size="small"
              value={file.offset}
              onKeyDown={onlyHex}
              onChange={(e) => setOffset(i, e.target.value)}
            />
          </Grid>

          {/* File Name */}
          <Grid item xs={9}>
            {file.fileName ? (
              <Typography className={styles.fileName}>
                {file.fileName}
              </Typography>
            ) : (
              <Button
                variant="contained"
                color="primary"
                component="label"
                endIcon={<UploadIcon />}
              >
                Select
                <input type="file" hidden onChange={(e) => uploadFile(e, i)} />
              </Button>
            )}
          </Grid>

          {/* Delete */}
          <Grid item xs={1}>
            <IconButton
              color="primary"
              sx="
                background-color: rgba(0,0,0,0.25); 
                -webkit-box-shadow: 0px 1px 3px 1px rgba(0,0,0,0.5);
                -moz-box-shadow: 0px 1px 3px 1px rgba(0,0,0,0.5);
                box-shadow: 0px 1px 3px 1px rgba(0,0,0,0.5);
              "
              onClick={() => deleteFile(i)}
            >
              {file.fileName ? <HighlightOffIcon /> : <DeleteIcon />}
            </IconButton>
          </Grid>
        </Grid>
      ))}

      {/* Add File */}
      <Grid container spacing={0.5}>
        <Grid item xs={6} sx={{ textAlign: "left" }}>
          <Button color="primary" onClick={reset} endIcon={<RestartAltIcon />}>
            Reset
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "right" }}>
          <Button color="primary" onClick={addFile} endIcon={<AddBoxIcon />}>
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

FileList.propTypes = {
  uploads: PropTypes.array,
  setUploads: PropTypes.func,
  chipName: PropTypes.string,
};

export default FileList;
