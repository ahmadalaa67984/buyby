import { Box, Divider } from "@chakra-ui/react";
import React from "react";
import CNavber from "./CNavber";
import CHead from "./CHead";
import { useRouter } from "next/router";

const CLayout = ({ title, description, children }) => {
  const router = useRouter();

  return (
    <>
      <CHead title={title} description={description} />

      {router.pathname === "/auth/signin" ||
      router.pathname === "/password/forgot" ||
      router.pathname === "/password/reset" ? (
        ""
      ) : (
        <CNavber />
      )}
      <Divider />
      <Box as='main' w='100%' h='100%'>
        {children}
      </Box>
    </>
  );
};

export default CLayout;
