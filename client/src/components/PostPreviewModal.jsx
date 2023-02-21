import Dialog from "@mui/material/Dialog";
import { Box, Typography, Button } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shades } from "../theme";
import { downloadImage } from "../utils";
import { generatePosts, updateForm } from "../state/formSlice";
import { deleteUserPost } from "../state/userPostsSlice";
import { useContext } from "react";
import { backdropContext } from "../context/BackdropContext";
import { removeSavedPost } from "../state/savedPostsSlice";

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
    dispatch(updateForm({ prompt: openPostData?.prompt }));
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

  const handleRemove = () => {
    handleClose();
    const args = {
      id: openPostData._id,
      toggleBackdrop,
    };
    dispatch(removeSavedPost(args));
  };

  return (
    <div>
      <Dialog
        sx={{
          ".MuiDialog-container .MuiPaper-root": {
            maxHeight: "650px",
            width: "350px",
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
            src={openPostData.image?.url}
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
            ) : personal ? (
              <Button
                sx={{
                  mt: "20px",
                  mb: "10px",
                  background: "#ff6b60",
                  padding: "10px",
                  color: "#fff",
                  ":hover": {
                    background: "#ff4f42",
                  },
                }}
                fullWidth
                onClick={handleDelete}
              >
                Delete
              </Button>
            ) : (
              <Button
                sx={{
                  textTransform: "none",
                  mt: "20px",
                  mb: "10px",
                  background: "#ff6b60",
                  padding: "10px",
                  color: "#fff",
                  ":hover": {
                    background: "#ff4f42",
                  },
                }}
                fullWidth
                onClick={handleRemove}
              >
                Remove from {openPostData.collectionName}
              </Button>
            )}
            <Button
              sx={{
                background: shades.secondary[300],
                padding: "10px",
              }}
              fullWidth
              onClick={() =>
                downloadImage({ ...openPostData.image, cloudinaryUrl: true })
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
