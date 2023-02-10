import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { shades } from "../theme";
import Card from "./Card";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { STATUS } from "../utils";
import Loading from "./Loading";
import DisplayAlert from "./DisplayAlert";
import { fetchPosts } from "../state/postsSlice";
import PostPreviewModal from "./PostPreviewModal";

const RenderCards = ({
  data,
  title,
  setSearchText,
  community,
  personal,
  loadingToggle,
}) => {
  const [openPost, setOpenPost] = useState(false);
  const [openPostData, setOpenPostData] = useState(null);

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
              loadingToggle,
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
      message={title}
      action={setSearchText ? "See all posts" : null}
      cb={setSearchText ? () => setSearchText("") : null}
    />
  );
};

const Posts = ({
  posts,
  status,
  community = false,
  personal = false,
  loadingToggle,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchPosts, setSearchPosts] = useState(null);
  const intervalId = useRef(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearchText(e.target.value);
    clearTimeout(intervalId.current);

    intervalId.current = setTimeout(() => {
      const searchResult = posts.filter(
        (post) =>
          post.user?.firstName
            .toLowerCase()
            .includes(e.target.value.toLocaleLowerCase()) ||
          post.prompt.toLowerCase().includes(e.target.value.toLocaleLowerCase())
      );
      setSearchPosts(searchResult);
    }, 500);
  };

  return (
    <Box>
      {/* Search */}
      <Box m="25px 0 10px">
        <TextField
          onChange={handleChange}
          value={searchText}
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
            cb={() => dispatch(fetchPosts())}
          />
        ) : (
          <>
            {searchText && (
              <Typography mt="15px" mb="5px" color={shades.primary[300]}>
                Showing results for{" "}
                <span style={{ color: "#000000" }}>{searchText}</span>
              </Typography>
            )}

            {searchText ? (
              <RenderCards
                setSearchText={setSearchText}
                data={searchPosts}
                community={community}
                personal={personal}
                loadingToggle={loadingToggle}
                title="No search results found"
              />
            ) : (
              <RenderCards
                data={posts}
                community={community}
                personal={personal}
                loadingToggle={loadingToggle}
                title="No posts found"
              />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Posts;
