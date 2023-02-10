import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Button,
  CircularProgress,
  DialogContent,
  IconButton,
  InputAdornment,
  Slide,
  TextField,
} from "@mui/material";
import { forwardRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { changePassword } from "../../state/userSlice";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { backdropContext } from "../../context/BackdropContext";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChangePassword({ openPwdDialog, setOpenPwdDialog }) {
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmNewPwd, setShowConfirmNewPwd] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toggleBackdrop } = useContext(backdropContext);

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = yup.object().shape({
    oldPassword: yup.string().trim().required("Required"),
    newPassword: yup
      .string()
      .trim()
      .required("Required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    confirmNewPassword: yup
      .string()
      .required("Required")
      .oneOf([yup.ref("newPassword"), null], "Passwords don't match."),
  });

  const handleFormSubmit = (values, { resetForm, setSubmitting }) => {
    const args = {
      values,
      setSubmitting,
      handleClose,
      navigate,
      toggleBackdrop,
    };
    dispatch(changePassword(args));
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema,
  });

  const {
    values,
    errors,
    handleSubmit,
    isSubmitting,
    touched,
    handleBlur,
    handleChange,
    resetForm,
  } = formik;
  const handleClose = () => {
    resetForm();
    setOpenPwdDialog(false);
  };

  return (
    <div>
      <Dialog
        sx={{
          ".MuiDialog-container .MuiPaper-root": {
            width: "400px",
            margin: "10px",
            minWidth: "300px",
          },
        }}
        open={openPwdDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>Change password</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.oldPassword}
              error={!!touched.oldPassword && !!errors.oldPassword}
              helperText={touched.oldPassword && errors.oldPassword}
              sx={{
                margin: "8px 0",
              }}
              required
              fullWidth
              label="Old Password"
              name="oldPassword"
              autoComplete="password"
            />

            <TextField
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.newPassword}
              error={!!touched.newPassword && !!errors.newPassword} //converting value to a boolean
              helperText={touched.newPassword && errors.newPassword}
              sx={{
                margin: "8px 0",
              }}
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type={showNewPwd ? "text" : "password"}
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPwd((show) => !show)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showNewPwd ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.confirmNewPassword}
              error={
                !!touched.confirmNewPassword && !!errors.confirmNewPassword
              } //converting value to a boolean
              helperText={
                touched.confirmNewPassword && errors.confirmNewPassword
              }
              sx={{
                margin: "8px 0",
              }}
              required
              fullWidth
              name="confirmNewPassword"
              label="Confirm New-Password"
              type={showConfirmNewPwd ? "text" : "password"}
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmNewPwd((show) => !show)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showConfirmNewPwd ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* signIn button */}
            <Box
              sx={{
                my: 1,
                position: "relative",
                width: "100%",
                height: "53px",
              }}
            >
              <Button
                sx={{
                  height: "100%",
                }}
                fullWidth
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >
                Change password
              </Button>
              {isSubmitting && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "#000000",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
