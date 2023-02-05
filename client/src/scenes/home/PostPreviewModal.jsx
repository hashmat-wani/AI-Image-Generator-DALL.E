import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { changePassword } from "../../state/userSlice";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";

export default function PostPreviewModal({
  openPost,
  setOpenPost,
  openPostData,
}) {
  console.log(openPostData);
  const handleClose = () => {
    // resetForm();
    setOpenPost(false);
  };

  return (
    <div>
      <Dialog
        sx={{
          ".MuiDialog-container .MuiPaper-root": {
            minHeight: "610px",
            width: "370px",
            margin: "10px",
            minWidth: "320px",
            borderRadius: "15px",
          },
        }}
        open={openPost}
        onClose={handleClose}
      >
        <Box>
          <img
            style={{ width: "100%" }}
            src={openPostData.image}
            alt="preview"
          />
          <Box p="20px 30px">
            <Typography textAlign="center" fontSize="15px">
              {openPostData.prompt}
            </Typography>
            <Button
              sx={{
                mt: "20px",
                mb: "10px",
                background: shades.secondary[300],
                padding: "10px",
              }}
              fullWidth
            >
              Try this example
            </Button>
            <Button
              sx={{
                background: shades.secondary[300],
                padding: "10px",
              }}
              fullWidth
            >
              Download
            </Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
