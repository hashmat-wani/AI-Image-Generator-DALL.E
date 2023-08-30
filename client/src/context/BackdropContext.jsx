import React, { createContext, useState } from "react";

export const backdropContext = createContext();

const BackdropContext = ({ children }) => {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [backdropMsg, setBackdropMsg] = useState("");

  const toggleBackdrop = (msg = "") => {
    setOpenBackdrop((prev) => !prev);
    setBackdropMsg(msg);
  };

  return (
    <backdropContext.Provider
      value={{ openBackdrop, toggleBackdrop, backdropMsg, setBackdropMsg }}
    >
      {children}
    </backdropContext.Provider>
  );
};

export default BackdropContext;
