import React, { createContext, useState } from "react";

export const backdropContext = createContext();

const BackdropContext = ({ children }) => {
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const toggleBackdrop = () => {
    setOpenBackdrop((prev) => !prev);
  };

  return (
    <backdropContext.Provider value={{ openBackdrop, toggleBackdrop }}>
      {children}
    </backdropContext.Provider>
  );
};

export default BackdropContext;
