import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  createSavedPost,
  createUserCollection,
  getUserCollections,
} from "../../state/collectionsSlice";
import { STATUS } from "../../utils";
import AddIcon from "@mui/icons-material/Add";
import { shades } from "../../theme";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import { FlexBox } from "../../components/FlexBox";
import DisplayAlert from "../../components/DisplayAlert";

export default function DDButton({ image, prompt }) {
  const dispatch = useDispatch();
  const [createCollection, setCreateCollection] = useState(false);
  const [input, setInput] = useState("");

  const { status, collections } = useSelector(
    (state) => state.collectionsReducer,
    shallowEqual
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (collections.length === 0) dispatch(getUserCollections());
  };
  const handleClose = () => {
    setCreateCollection(false);
    setInput("");
    setAnchorEl(null);
  };

  const handleSave = (collectionId, collectionName) => {
    const args = {
      handleClose,
      image,
      prompt,
      collectionId,
      collectionName,
    };
    dispatch(createSavedPost(args));
  };

  const handleCreate = () => {
    const args = { cb: setCreateCollection, input, setInput };
    dispatch(createUserCollection(args));
  };

  const error = () => input.trim().toLowerCase() === "favorites";

  return (
    <div>
      <Button
        sx={{
          fontWeight: "bold",
          transition: "0.2s",
          padding: "8px 15px",
          borderRadius: "5px",
        }}
        variant="contained"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Save
      </Button>
      <Menu
        keepMounted
        sx={{
          mt: "5px",
          "& ul": {
            padding: "10px",
          },
          "> div": {
            borderRadius: "6px",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "300px",
          }}
          disableRipple
        >
          <Typography fontWeight="bold" fontSize="16px">
            {createCollection ? "Create collection" : "Save to collection"}
          </Typography>
          {status === STATUS.LOADING && <CircularProgress size="15px" />}
        </MenuItem>

        {createCollection ? (
          <Box padding="2px 15px" my="15px">
            <TextField
              required
              fullWidth
              size="small"
              placeholder="e.g. Food"
              onChange={(e) => setInput(e.target.value)}
              helperText={error() && 'Collection name cannot be "favorites"'}
              error={error()}
              value={input}
              label="Name"
            />
          </Box>
        ) : (
          <Box>
            {status === STATUS.ERROR ? (
              <Box padding="0 15px">
                <DisplayAlert
                  type="error"
                  title="Oops..."
                  message="it looks like something went wrong."
                  action="Reload"
                  cb={() => dispatch(getUserCollections())}
                />
              </Box>
            ) : (
              <Box>
                {collections.map((node, idx) => (
                  <Box key={idx}>
                    <MenuItem
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        m: "5px 0",
                        ...(status === STATUS.LOADING && {
                          pointerEvents: "none",
                          color: shades.primary[100],
                        }),
                      }}
                      onClick={() => handleSave(node._id, node.name)}
                      disableRipple
                    >
                      <Typography>{node.name}</Typography>
                      <LockIcon
                        sx={{ fontSize: "18px", color: shades.primary[200] }}
                      />
                    </MenuItem>
                    {idx === 0 && <Divider sx={{ my: 0.5 }} />}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}

        {createCollection ? (
          <FlexBox
            padding="2px 15px"
            width="300px"
            gap="10px"
            justifyContent="space-between"
          >
            <Button
              onClick={() => setCreateCollection(false)}
              sx={{ textTransform: "none" }}
            >
              Back
            </Button>

            <Box
              sx={{
                position: "relative",
                width: "100%",
              }}
            >
              <Button
                onClick={handleCreate}
                sx={{ textTransform: "none" }}
                disabled={status === STATUS.LOADING || !input.trim() || error()}
                fullWidth
                variant="contained"
              >
                Create collection
              </Button>
              {status === STATUS.LOADING && (
                <CircularProgress
                  size={18}
                  sx={{
                    color: "#000000",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-9px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
          </FlexBox>
        ) : (
          <MenuItem
            sx={{
              ...(status === STATUS.LOADING && {
                pointerEvents: "none",
                color: shades.primary[100],
              }),
            }}
            onClick={() => setCreateCollection(true)}
            disableRipple
          >
            <AddIcon
              fontSize="small"
              sx={{
                mr: "5px",
              }}
            />
            <Typography fontWeight="bold">Create collection</Typography>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
