import Dialog from "@mui/material/Dialog";
import { Box, Typography, Button } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shades } from "../theme";
import { downloadImage } from "../utils";
import { generatePosts } from "../state/formSlice";
import { deleteUserPost } from "../state/userPostsSlice";

export default function PostPreviewModal({
  openPost,
  setOpenPost,
  openPostData,
  community,
  personal,
  loadingToggle,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.userReducer, shallowEqual);

  const handleClose = () => {
    setOpenPost(false);
  };

  const handleGenerate = (prompt) => {
    navigate("/search");
    dispatch(generatePosts(prompt));
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
                onClick={() => handleGenerate(openPostData.prompt)}
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
                onClick={() =>
                  dispatch(
                    deleteUserPost(
                      openPostData._id,
                      user?._id,
                      handleClose,
                      loadingToggle
                    )
                  )
                }
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
