import { Box, Button, Heading, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "services/combinedReducers";
import CSideMenuItem from "./CSideMenuItem";
import { menuData } from "./menuData";

interface Props {
  sideWidth: number;
  sideActive: boolean;
  setSidActive: (value: boolean) => void;
}
const CSideMenu = ({ sideWidth, sideActive, setSidActive }) => {
  const router = useRouter();
  return (
    <Box
      w={`${sideWidth}vw`}
      minH='90vh'
      // boxShadow="xl"
      position='relative'
      transition='all 0.5s'>
      {/* <Button
        zIndex={1000}
        position='absolute'
        right={-5}
        variant='unstyled'
        onClick={() => setSidActive(!sideActive)}>
        <Icon
          as={!sideActive ? MdKeyboardArrowRight : MdKeyboardArrowLeft}
          w={6}
          h={6}
          bg='primary'
          borderRadius='50%'
        />
      </Button> */}
      <Box>
        {menuData(router?.asPath, "", "").map((data, index) => (
          <CSideMenuItem sideActive={sideActive} {...data} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default CSideMenu;
