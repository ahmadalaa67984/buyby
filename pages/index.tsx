import { useEffect } from "react";
import CLayout from "@/components/layout/CLayout";
import { Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/services/combinedReducers";

const Homepage = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <CLayout title={"Homepage"} description='Homepage'>
      <Flex
        alignItems={"center"}
        justifyContent='center'
        h='100vh'
        flexDir={"column"}
        gridGap={8}>
        <Heading size={"4xl"}>Homepage</Heading>
        {token ? null : (
          <Link href={"/auth/signin"}>
            <Button colorScheme={"primaryColorScheme"}>Signin</Button>
          </Link>
        )}
      </Flex>
    </CLayout>
  );
};

export default Homepage;
