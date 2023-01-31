import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar, Box, Typography } from "@mui/material";
import { FlexBox } from "../../components/FlexBox";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRef, useState } from "react";
import { shades } from "../../theme";
import { green } from "@mui/material/colors";
import { removeUserAvatar, updateUserAvatar } from "../../state/userSlice";
import { useDispatch } from "react-redux";
import { resolvePath } from "../../utils";

export default function UpdateAvatar({ user, open, setOpen }) {
  const avatarRef = useRef(null);

  const handleClose = () => {
    setAvatar(user.avatar);
    setPreview(user.avatar);
    setOpen(false);
  };

  const [avatar, setAvatar] = useState(user.avatar);
  const [preview, setPreview] = useState(user.avatar);
  console.log(avatar);

  const dispatch = useDispatch();

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
            minWidth: "320px",
          },
        }}
        open={open}
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
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={resolvePath(preview)}
                alt="avatar"
              />
            ) : (
              <Avatar
                sx={{ bgcolor: green[500], width: "200px", height: "200px" }}
              >
                <Typography fontSize="106px">
                  {user.firstName[0].toUpperCase()}
                </Typography>
              </Avatar>
            )}
          </FlexBox>

          {/* action buttons */}

          <FlexBox padding="15px 20px" justifyContent="space-between">
            {/* left side buttons */}
            <FlexBox columnGap="20px">
              {/* Add photo */}
              <Box
                sx={{ cursor: "pointer" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                onClick={() => avatarRef.current.click()}
              >
                <CameraAltIcon />
                <Typography>Add photo</Typography>
              </Box>
              {/* Delete photo */}
              <Box
                onClick={() => setAvatar(null)}
                sx={{ cursor: "pointer" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <DeleteIcon />
                <Typography>Delete</Typography>
              </Box>
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
              <Box
                onClick={handleClose}
                sx={{ cursor: "pointer", border: "1px solid #0a66c2" }}
                padding="8px 18px"
                borderRadius="20px"
              >
                <Typography>Cancel</Typography>
              </Box>

              <Box
                onClick={() => {
                  dispatch(
                    avatar ? updateUserAvatar(avatar) : removeUserAvatar()
                  );
                }}
                padding="10px 20px"
                borderRadius="20px"
                sx={{
                  background: `${avatar ? "#0a66c2" : "tomato"}`,
                  display: `${
                    typeof avatar === "string" || (!avatar && !user.avatar)
                      ? "none"
                      : "block"
                  }`,
                  cursor: "pointer",
                }}
              >
                <Typography>{avatar ? "Save" : "Delete"}</Typography>
              </Box>
            </FlexBox>
          </FlexBox>
        </Box>
      </Dialog>
    </div>
  );
}
