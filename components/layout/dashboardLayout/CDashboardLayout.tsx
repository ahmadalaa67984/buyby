import { Flex, Box, Container } from "@chakra-ui/react";
import React, { useState } from "react";
import CHead from "../CHead";
import CNavber from "../CNavber";
import CSideMenu from "./sideMenu/CSideMenu";

const CDashboardLayout = ({ title, description, children, count }) => {
  const [sideActive, setSidActive] = useState(true);
  const sideWidth = sideActive ? 16 : 5;
  return (
    <Box>
      <CHead title={title} description={description} />
      <CNavber />
      <Flex color='white' transition='all 0.5s'>
        <CSideMenu
          sideWidth={sideWidth}
          setSidActive={setSidActive}
          sideActive={sideActive}
        />

        <Box w={`${100 - sideWidth}vw`} minH='100vh' bg='gray.50' color='#000'>
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default CDashboardLayout;
