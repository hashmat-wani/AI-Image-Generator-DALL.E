import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Slide,
  Typography,
} from "@mui/material";
import { FlexBox } from "../../components/FlexBox";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { forwardRef, useRef, useState } from "react";
import { shades } from "../../theme";
import { green } from "@mui/material/colors";
import { removeUserAvatar, updateUserAvatar } from "../../state/userSlice";
import { useDispatch } from "react-redux";
import { resolvePath, STATUS } from "../../utils";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateAvatar({
  user,
  status,
  openAvatarDialog,
  setOpenAvatarDialog,
}) {
  const avatarRef = useRef(null);

  const [avatar, setAvatar] = useState(user?.avatar);
  const [preview, setPreview] = useState(user?.avatar?.url);

  const handleClose = (e, avatar = user?.avatar) => {
    setAvatar(avatar);
    setPreview(avatar?.url);
    setOpenAvatarDialog(false);
  };

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(
      avatar
        ? updateUserAvatar(handleClose, avatar)
        : removeUserAvatar(handleClose)
    );
  };

  return (
    <div>
      <Dialog
        sx={{
          ".MuiDialog-container .MuiPaper-root": {
            color: "white",
            backgroundColor: "#1d2226",
            maxWidth: "800px",
            width: "700px",
            margin: "10px",
            minWidth: "300px",
          },
        }}
        open={openAvatarDialog}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>Profile photo</DialogTitle>
        <Box>
          {/* Image */}
          <FlexBox
            sx={{
              height: "240px",
              pb: "40px",
              borderBottom: `1px solid ${shades.secondary[800]}`,
            }}
            justifyContent="center"
          >
            {avatar ? (
              <img
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={resolvePath(preview)}
                alt="avatar"
              />
            ) : (
              <Avatar
                sx={{ bgcolor: green[500], width: "180px", height: "180px" }}
              >
                <Typography fontSize="106px">
                  {user.firstName[0].toUpperCase()}
                </Typography>
              </Avatar>
            )}
          </FlexBox>

          {/* action buttons */}

          <FlexBox
            sx={{
              opacity: status === STATUS.LOADING ? 0.5 : 1,
              color: "#fff",
            }}
            padding="15px 20px"
            justifyContent="space-between"
          >
            {/* left side buttons */}
            <FlexBox columnGap="10px">
              {/* Add photo */}
              <Button
                disabled={status === STATUS.LOADING}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  textTransform: "none",
                  color: "#fff",
                  ":disabled": {
                    color: "#fff",
                  },
                }}
                onClick={() => avatarRef.current.click()}
              >
                <CameraAltIcon />
                <Typography>Add photo</Typography>
              </Button>
              {/* Delete photo */}
              <Button
                onClick={() => setAvatar(null)}
                disabled={status === STATUS.LOADING || !avatar}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  textTransform: "none",
                  color: "#fff",
                  ":disabled": {
                    opacity: 0.5,
                    color: "#fff",
                  },
                }}
              >
                <DeleteIcon />
                <Typography>Delete</Typography>
              </Button>
              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setAvatar(file);
                  setPreview(URL.createObjectURL(file));
                }}
                ref={avatarRef}
                type="file"
                name="avatar"
                accept="image/*"
                hidden
              />
            </FlexBox>

            {/* Right side buttons */}

            <FlexBox columnGap="20px">
              <Button
                disabled={status === STATUS.LOADING}
                onClick={handleClose}
                sx={{
                  border: "1px solid #0a66c2",
                  textTransform: "none",
                  color: "#fff",
                  padding: "8px 18px",
                  borderRadius: "20px",
                  ":disabled": {
                    color: "#fff",
                  },
                }}
              >
                <Typography>Cancel</Typography>
              </Button>

              {/* save button */}
              <Box
                sx={{
                  display: `${
                    typeof avatar?.url === "string" || avatar === user?.avatar
                      ? "none"
                      : "block"
                  }`,
                  position: "relative",
                }}
              >
                <Button
                  onClick={handleSubmit}
                  disabled={status === STATUS.LOADING}
                  sx={{
                    ":disabled": { background: "lightgray", color: "#fff" },
                    ":hover": {
                      background: `${avatar ? "#0682ff" : "#df0404"}`,
                    },
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "20px",
                    position: "relative",
                    background: `${avatar ? "#0a66c2" : "tomato"}`,
                  }}
                >
                  <Typography>{avatar ? "Save" : "Delete"}</Typography>
                </Button>

                {status === STATUS.LOADING && (
                  <CircularProgress
                    sx={{
                      color: "#0a66c2",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-11px",
                      marginLeft: "-11px",
                    }}
                    size={20}
                  />
                )}
              </Box>
            </FlexBox>
          </FlexBox>
        </Box>
      </Dialog>
    </div>
  );
}
