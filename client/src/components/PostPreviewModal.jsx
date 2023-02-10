import Dialog from "@mui/material/Dialog";
import { Box, Typography, Button } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shades } from "../theme";
import { downloadImage } from "../utils";
import { generatePosts } from "../state/formSlice";
import { deleteUserPost } from "../state/userPostsSlice";
import { useContext } from "react";
import { backdropContext } from "../context/BackdropContext";

export default function PostPreviewModal({
  openPost,
  setOpenPost,
  openPostData,
  community,
  personal,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.userReducer, shallowEqual);

  const { toggleBackdrop } = useContext(backdropContext);

  const handleClose = () => {
    setOpenPost(false);
  };

  const handleGenerate = () => {
    navigate("/search");
    const args = { prompt: openPostData?.prompt };
    dispatch(generatePosts(args));
  };

  const handleDelete = () => {
    handleClose();
    const args = {
      id: openPostData._id,
      userId: user?._id,
      toggleBackdrop,
    };
    dispatch(deleteUserPost(args));
  };

  return (
    <div>
      <Dialog
        sx={{
          ".MuiDialog-container .MuiPaper-root": {
            maxHeight: "650px",
            width: "400px",
            margin: "10px",
            minWidth: "300px",
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
          <Box p="20px 30px 30px">
            <Typography textAlign="center" fontSize="15px">
              {openPostData.prompt}
            </Typography>
            {community ? (
              <Button
                sx={{
                  mt: "20px",
                  mb: "10px",
                  background: shades.secondary[300],
                  padding: "10px",
                }}
                fullWidth
                onClick={handleGenerate}
              >
                Try this example
              </Button>
            ) : (
              <Button
                sx={{
                  mt: "20px",
                  mb: "10px",
                  background: "#ff6b60",
                  padding: "10px",
                  ":hover": {
                    background: "#ff4f42",
                  },
                }}
                fullWidth
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
            <Button
              sx={{
                background: shades.secondary[300],
                padding: "10px",
              }}
              fullWidth
              onClick={() =>
                downloadImage(openPostData._id, openPostData.image)
              }
            >
              Download
            </Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
