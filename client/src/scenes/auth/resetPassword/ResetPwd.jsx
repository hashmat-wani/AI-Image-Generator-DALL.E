import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { shades } from "../../../theme";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { sendEmail } from "../../../state/resetPwdSlice";
import { STATUS } from "../../../utils";
import logo from "../../../assets/smallLogo.svg";

export default function ResetPwd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector(
    (state) => state.resetPwdReducer,
    shallowEqual
  );

  const initialValues = {
    email: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().trim().email("Invalid email").required("Required"),
  });

  const handleFormSubmit = (values) => {
    const args = {
      email: values.email.toLowerCase(),
      navigate,
    };
    dispatch(sendEmail(args));
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema,
  });

  const { values, errors, handleSubmit, touched, handleBlur, handleChange } =
    formik;

  return (
    <Box
      sx={{
        minWidth: "320px",
        maxWidth: "360px",
        padding: "20px",
        margin: "50px auto auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Link to="/">
        <img
          style={{ width: "32px", marginBottom: "60px" }}
          src={logo}
          alt="logo"
        />
      </Link>
      <Typography color={shades.primary[400]} fontSize="28px" fontWeight="bold">
        Reset your password
      </Typography>
      <Typography my="10px" textAlign="center" color={shades.primary[300]}>
        Enter your email address and we will send you instructions to reset your
        password.
      </Typography>
      <Box
        width="100%"
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          error={!!touched.email && !!errors.email} //converting value to a boolean
          helperText={touched.email && errors.email}
          sx={{
            margin: "8px 0",
          }}
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />

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
            disabled={status === STATUS.LOADING}
          >
            Continue
          </Button>
          {status === STATUS.LOADING && (
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
        <Typography my="10px" color="#0066C0" textAlign="center">
          <Link to="/signin">Back to login</Link>
        </Typography>
      </Box>
    </Box>
  );
}
