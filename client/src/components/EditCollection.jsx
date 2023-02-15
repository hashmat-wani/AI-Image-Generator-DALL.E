import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Button,
  CircularProgress,
  DialogContent,
  Slide,
  TextField,
} from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { STATUS } from "../utils";
import { forwardRef, useState } from "react";
import { editUserCollection } from "../state/collectionsSlice";
import { FlexBox } from "./FlexBox";
import { shades } from "../theme";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide ref={ref} {...props} />;
});

export default function EditCollection({
  open,
  setOpen,
  collectionName,
  setCollectionName,
  id,
}) {
  const dispatch = useDispatch();
  const [input, setInput] = useState(collectionName);

  const { status } = useSelector(
    (state) => state.collectionsReducer,
    shallowEqual
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    const args = { input, setInput, cb: setOpen, id, setCollectionName };
    dispatch(editUserCollection(args));
  };

  const error = () => input.trim().toLowerCase() === "favorites";

  return (
    <div>
      <Dialog
        sx={{
          ".MuiDialog-container .MuiPaper-root": {
            width: "400px",
            margin: "10px",
            minWidth: "300px",
            borderRadius: "20px",
            p: "10px",
          },
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>Edit Collection</DialogTitle>
        <DialogContent>
          <Box my="15px">
            <TextField
              required
              fullWidth
              size="small"
              placeholder="e.g. Fashion"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              helperText={error() && 'Collection name cannot be "favorites"'}
              error={error()}
              label="Name"
            />
          </Box>

          <FlexBox
            height="45px"
            m="35px 0 10px"
            gap="10px"
            justifyContent="space-between"
            sx={{
              alignItems: "stretch",
            }}
          >
            <Button
              disabled={status === STATUS.LOADING}
              onClick={handleClose}
              sx={{
                textTransform: "none",
                p: "0 25px",
                backgroundColor: shades.secondary[300],
                borderRadius: "7px",
              }}
            >
              Cancel
            </Button>

            <Box
              sx={{
                position: "relative",
                width: "100%",
              }}
            >
              <Button
                onClick={handleEdit}
                sx={{
                  textTransform: "none",
                  height: "100%",
                  borderRadius: "7px",
                }}
                disabled={status === STATUS.LOADING || !input.trim() || error()}
                fullWidth
                variant="contained"
              >
                Edit collection
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
