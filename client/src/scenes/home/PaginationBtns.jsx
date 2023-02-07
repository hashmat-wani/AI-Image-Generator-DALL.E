import { Box, Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setpage } from "../../state/postsSlice";

const PaginationBtns = () => {
  const { totalPages } = useSelector(
    (state) => state.postsReducer,
    shallowEqual
  );

  const dispatch = useDispatch();

  const handlePageChange = (e, page) => {
    dispatch(setpage(page));
  };
  return (
    <>
      {totalPages > 0 && (
        <Stack alignItems="center" my="40px">
          <Pagination
            onChange={handlePageChange}
            count={totalPages}
            showFirstButton
            showLastButton
          />
        </Stack>
      )}
    </>
  );
};

export default PaginationBtns;
