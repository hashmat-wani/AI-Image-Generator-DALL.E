import Dialog from "@mui/material/Dialog";
import { Box, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { downloadImage } from "../../utils";
import { generatePosts } from "../../state/formSlice";

export default function PostPreviewModal({
  openPost,
  setOpenPost,
  openPostData,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <Box p="20px 30px 30px">
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
              onClick={() => handleGenerate(openPostData.prompt)}
            >
              Try this example
            </Button>
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
