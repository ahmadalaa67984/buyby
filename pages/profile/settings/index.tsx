import CLayout from "@/components/layout/CLayout";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";

const ProfileSettings = () => {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  return (
    <CLayout title={"Profile Settings"} description={"Profile Settings"}>
      <Container maxW='lg' paddingTop='5'>
        <Flex alignItems={"center"} justifyContent='center' h='100vh'>
          <Box p={8} boxShadow='md' minW={"500px"} minH='200px'>
            <Flex flexDirection={"column"} gridGap={4}>
              <FormControl>
                <FormLabel>New Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    type={show ? "text" : "password"}
                    placeholder='New Password'
                    value={password}
                    autoComplete='new-password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button
                      h='1.75rem'
                      size='sm'
                      onClick={() => setShow((prev) => !prev)}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button>Update</Button>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </CLayout>
  );
};

export default ProfileSettings;
