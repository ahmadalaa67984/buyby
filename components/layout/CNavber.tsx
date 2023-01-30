import { Box, Flex } from "@chakra-ui/react";

const CNavber = () => {
  return (
    <Flex
      p={8}
      textAlign='center'
      boxShadow={"md"}
      alignItems='center'
      justifyContent={"space-between"}>
      <Box fontWeight={"bold"} fontSize={22}>
        Buy By
      </Box>
      {/* <Box>links</Box> */}
    </Flex>
  );
};

export default CNavber;
