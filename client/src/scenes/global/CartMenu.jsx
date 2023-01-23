import React from "react";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
  setIsCartOpen,
} from "../../state";
import { shades } from "../../theme";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart, isCartOpen } = useSelector(
    (state) => state.cartReducer,
    shallowEqual
  );
  console.log(cart);

  const totalPrice = cart.reduce(
    (ac, el) => ac + el.qty * el.attributes.price,
    0
  );

  return (
    <Box // overlay
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0,0,0,0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      {/* Modal */}
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px,30%)"
        height="100%"
        backgroundColor="white"
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox
            //  border={1}
            mb="15px"
          >
            <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen())}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* CART LIST */}
          <Box>
            {cart.map((item) => (
              <Box key={`${item.attributes.name}-${item?.id}`}>
                <FlexBox
                  // border={1}
                  p="15px 0"
                >
                  <Box flex="1 1 40%">
                    <img
                      src={`http://localhost:1337${item.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                      alt={item?.attributes?.name}
                      width="123px"
                      height="164px"
                    />
                  </Box>

                  <Box flex="1 1 60%">
                    {/* ITEM NAME */}
                    <FlexBox mb="15px">
                      <Typography fontWeight="bold">
                        {item.attributes.name}
                      </Typography>

                      <IconButton
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>

                    <Typography>{item.attributes.shortDescription}</Typography>

                    {/* HANDLE QTY */}
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={() => dispatch(decreaseQty(item.id))}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.qty}</Typography>
                        <IconButton
                          onClick={() => dispatch(increaseQty(item.id))}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>

                      {/* PRICE */}
                      <Typography fontWeight="bold">
                        ₹{item.attributes.price}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* ACTIONS */}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">SUBTOTAL</Typography>
              <Typography fontWeight="bold">₹{totalPrice}</Typography>
            </FlexBox>
            <Button
              disabled={cart.length === 0}
              sx={{
                backgroundColor: shades.primary[400],
                color: "white",
                borderRadius: "0",
                minWidth: "100%",
                padding: "20px 40px",
                m: "20px 0",
                ":disabled": { color: "#e9e9e9" },
                ":hover": { color: "black" },
              }}
              onClick={() => {
                navigate("/checkout");
                dispatch(setIsCartOpen());
              }}
            >
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
