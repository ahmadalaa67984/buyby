import { signoutRequest } from "@/modules/auth/Actions";
import { RootState } from "@/services/combinedReducers";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Container,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  WrapItem,
  Avatar,
  Heading,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdDashboardCustomize } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import CHead from "../CHead";
import CNavber from "../CNavber";
import CSideMenu from "./sideMenu/CSideMenu";

const CDashboardLayout = ({ title, description, children, count }) => {
  const [sideActive, setSidActive] = useState(true);
  const sideWidth = sideActive ? 18 : 5;

  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const { data } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  // useEffect(() => {
  //   if (router.pathname !== "/auth/signin" && router.pathname !== "/") {
  //     dispatch(getUserRequest());
  //   }
  // }, [dispatch]);

  return (
    <Box>
      <CHead title={title} description={description} />
      {/* <CNavber /> */}
      <Flex color='white' transition='all 0.5s'>
        <CSideMenu
          sideWidth={sideWidth}
          setSidActive={setSidActive}
          sideActive={sideActive}
        />

        <Box w={`${100 - sideWidth}vw`} minH='100vh' bg='#F3F2F7' color='#000'>
          <Flex
            px={"45px"}
            mt={8}
            // bg='gray.400'
            alignItems='center'
            justifyContent={"space-between"}>
            <Box>
              <IconButton
                aria-label=''
                bg='none'
                onClick={() => setSidActive(!sideActive)}>
                <HiOutlineMenuAlt3 fontSize={23} />
              </IconButton>
            </Box>
            <Box>
              {token ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    bg='none'
                    _hover={{
                      bg: "none",
                    }}>
                    <Flex alignItems={"center"} gridGap={3}>
                      <Flex flexDir={"column"} gridGap={1}>
                        <Heading size={"sm"}>{data?.name}</Heading>
                        <Text color={"gray.500"} fontSize='13px'>
                          {data?.email}
                        </Text>
                      </Flex>
                      <WrapItem bg='primary' borderRadius={"50%"}>
                        <Avatar bg='primary' color={"#fff"} name={data?.name} />
                      </WrapItem>
                    </Flex>
                  </MenuButton>
                  <MenuList p={0}>
                    <MenuItem
                      p={4}
                      _hover={{
                        color: "blue.500",
                      }}
                      onClick={() => router.push("/system-logs/1")}
                      icon={<MdDashboardCustomize fontSize={22} />}>
                      Dashboard
                    </MenuItem>
                    <MenuItem
                      p={4}
                      _hover={{
                        color: "blue.500",
                      }}
                      onClick={() => router.push("/profile/settings")}
                      icon={<RiLockPasswordFill fontSize={22} />}>
                      Change Password
                    </MenuItem>
                    <MenuItem
                      p={4}
                      _hover={{
                        color: "blue.500",
                      }}
                      onClick={() => dispatch(signoutRequest())}
                      icon={<BiLogOutCircle fontSize={22} />}>
                      Sign Out
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : null}
            </Box>
          </Flex>
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default CDashboardLayout;
