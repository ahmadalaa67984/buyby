import React from "react";
import { ModalOverlay } from "@chakra-ui/react";
const CModalOverlay = () => {
  return (
    <ModalOverlay
      bg='none'
      backdropFilter='auto'
      backdropInvert='80%'
      backdropBlur='2px'
    />
  );
};

export default CModalOverlay;
