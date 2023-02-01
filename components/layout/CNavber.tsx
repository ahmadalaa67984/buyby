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
import { useEffect } from "react";
import { useRouter } from "next/router";

const CNavber = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const { data } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== "/auth/signin") {
      dispatch(getUserRequest());
    }
  }, [dispatch]);

  return (
    <Flex
      p={8}
      textAlign='center'
      alignItems='center'
      justifyContent={"space-between"}>
      <Box fontWeight={"bold"} fontSize={22}>
        Buy By
      </Box>
      <Box>
        {token ? (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {data?.email}
            </MenuButton>
            <MenuList p={0}>
              <MenuItem onClick={() => router.push("/profile/settings")}>
                Change Password
              </MenuItem>
              <MenuItem onClick={() => dispatch(signoutRequest())}>
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
