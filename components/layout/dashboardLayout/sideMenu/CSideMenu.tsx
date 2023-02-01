import { Box, Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
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
      boxShadow='xl'
      bg='linear-gradient(121.56deg, #F8F7FF 8.05%, #FAF9FF 82.51%)'
      m={4}
      p={3}
      borderRadius={"3xl"}
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
        <Flex alignItems={"center"} gridGap={4} my={4}>
          <Box>
            <Link href={"/dashboard"}>
              <Image
                src='/images/logo.png'
                alt='Buy By Logo'
                width={50}
                height={50}
              />
            </Link>
          </Box>
          {!sideActive ? (
            ""
          ) : (
            <Flex flexDir={"column"} gridGap={1}>
              <Heading color={"#000"} size='xl'>
                Buy By
              </Heading>
              <Text color={"gray.400"}>Super Admin Dashboard</Text>
            </Flex>
          )}
        </Flex>
        {menuData(router?.asPath, "", "").map((data, index) => (
          <CSideMenuItem sideActive={sideActive} {...data} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default CSideMenu;
