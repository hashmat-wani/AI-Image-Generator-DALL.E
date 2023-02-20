import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { shades } from "../theme";
import Card from "./Card";
import SearchIcon from "@mui/icons-material/Search";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { STATUS } from "../utils";
import Loading from "./Loading";
import DisplayAlert from "./DisplayAlert";
import { fetchPosts, setSearchPost } from "../state/postsSlice";
import PostPreviewModal from "./PostPreviewModal";
import { fetchUserPosts } from "../state/userPostsSlice";
import { backdropContext } from "../context/BackdropContext";

const RenderCards = ({ data, title, community, personal }) => {
  const [openPost, setOpenPost] = useState(false);
  const [openPostData, setOpenPostData] = useState(null);
  const { searchPost } = useSelector(
    (state) => state.postsReducer,
    shallowEqual
  );

  const dispatch = useDispatch();

  const isSmallScreen = useMediaQuery("(max-width:499px)");

  if (data?.length > 0)
    return (
      <>
        {/* Post preview Modal */}
        {openPostData && (
          <PostPreviewModal
            {...{
              openPost,
              setOpenPost,
              openPostData,
              community,
              personal,
            }}
          />
        )}

        <Box
          sx={{
            display: "grid",
            gridAutoFlow: "row dense",
            gap: "5px",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(5, 1fr)",
              ">:nth-of-type(10n+1)": {
                gridColumn: `${isSmallScreen ? "auto/span 1" : "auto/span 2"}`,
                gridRow: `${isSmallScreen ? "auto/span 1" : "auto/span 2"}`,
              },
            },
          }}
        >
          {data.map((post, idx) => (
            <Card
              key={idx}
              {...{
                ...post,
                setOpenPost,
                setOpenPostData,
                community,
                personal,
              }}
            />
          ))}
        </Box>
      </>
    );

  return (
    <DisplayAlert
      type="info"
      title="Oops..."
      message={
        community
          ? title
          : "Unfortunately, we could not find any posts to display. Your shared images will appear here"
      }
      action={searchPost && community ? "See all posts" : null}
      cb={searchPost && community ? () => dispatch(setSearchPost("")) : null}
    />
  );
};

const Posts = ({
  posts,
  status,
  userId,
  community = false,
  personal = false,
}) => {
  const dispatch = useDispatch();
  const { toggleBackdrop } = useContext(backdropContext);
  
  const { searchPost } = useSelector(
    (state) => state.postsReducer,
    shallowEqual
  );

  
  const handleChange = (e) => {
    if (community) {
      dispatch(setSearchPost(e.target.value));
    }
  };

  return (
    <Box>
      {/* Search */}
      {community && (
        <Box m="25px 0 15px">
          <TextField
            onChange={handleChange}
            value={searchPost}
            variant="standard"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}

      {/* Posts */}
      <Box>
        {status === STATUS.LOADING ? (
          <Loading />
        ) : status === STATUS.ERROR ? (
          <DisplayAlert
            type="error"
            title="Error"
            message="Something went wrong"
            action="Reload"
            cb={() =>
              dispatch(
                community
                  ? fetchPosts({})
                  : fetchUserPosts({
                      userId,
                      toggleBackdrop,
                      concat: false,
                    })
              )
            }
          />
        ) : (
          <>
            {searchPost && (
              <Typography mt="15px" mb="5px" color={shades.primary[300]}>
                Showing results for{" "}
                <span style={{ color: "#000000" }}>{searchPost}</span>
              </Typography>
            )}

            <RenderCards
              data={posts}
              community={community}
              personal={personal}
              title={searchPost ? "No search results found" : "No posts found"}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Posts;
