import { Box, Divider } from "@chakra-ui/react";
import React from "react";
import CNavber from "./CNavber";
import CHead from "./CHead";

const CLayout = ({ title, description, children }) => {
  return (
    <>
      <CHead title={title} description={description} />

      <CNavber />
      <Divider />
      <Box as='main' w='100%' h='100%'>
        {children}
      </Box>
    </>
  );
};

export default CLayout;
