import { signoutRequest } from "@/modules/auth/Actions";
import { getUserRequest } from "@/modules/user/Actions";
import { RootState } from "@/services/combinedReducers";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { MdDashboardCustomize } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";
import Image from "next/image";

const CNavber = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const { data } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const routes = useMemo(() => {
    return ["/auth/signin", "/password/forgot", "/password/reset"];
  }, []);

  useEffect(() => {
    if (routes.includes(router.pathname)) {
      dispatch(getUserRequest());
    }
  }, [dispatch, router.pathname, routes]);

  return (
    <Flex
      p={8}
      textAlign='center'
      alignItems='center'
      justifyContent={"space-between"}>
      <Link href='/'>
        <Image
          src='/images/logo.png'
          alt='Buy By Logo'
          width={40}
          height={40}
        />
      </Link>
      <Box>
        {token ? (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {data?.email}
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
  );
};

export default CNavber;
