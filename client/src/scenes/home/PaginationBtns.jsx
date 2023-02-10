import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../state/postsSlice";

const PaginationBtns = () => {
  const { totalPages, currPage, searchPost } = useSelector(
    (state) => state.postsReducer,
    shallowEqual
  );

  const dispatch = useDispatch();

  const handlePageChange = (e, page) => {
    dispatch(fetchPosts({ page, searchPost }));
  };
  return (
    <>
      {totalPages > 0 && (
        <Stack alignItems="center" my="40px">
          <Pagination
            onChange={handlePageChange}
            count={totalPages}
            page={currPage}
            showFirstButton
            showLastButton
          />
        </Stack>
      )}
    </>
  );
};

export default PaginationBtns;
