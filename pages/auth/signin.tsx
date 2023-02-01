import CLayout from "@/components/layout/CLayout";
import { signinRequest } from "@/modules/auth/Actions";
import { RootState } from "@/services/combinedReducers";
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
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const signin = () => {
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    password: "P@ssw0rd",
    email: "hemedah94@gmail.com",
  });

  const { password, email } = values;

  const { token } = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  //   useEffect(() => {
  //     if (token) {
  //       router.back();
  //     }
  //   }, [token, router]);

  const onSubmit = () => {
    dispatch(signinRequest(values));
  };

  console.log({ user, token });

  return (
    <CLayout title={"Sign in"} description='Sign in'>
      <Container maxW='lg' paddingTop='5'>
        <Flex alignItems={"center"} justifyContent='center' h='100vh'>
          <Box p={8} boxShadow='md' minW={"500px"} minH='500px'>
            <Flex flexDirection={"column"} gridGap={4}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={email}
                  autoComplete='new-email'
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    type={show ? "text" : "password"}
                    placeholder='Password'
                    name='password'
                    value={password}
                    autoComplete='new-password'
                    onChange={handleChange}
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
              <Button onClick={onSubmit}>Sign in</Button>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </CLayout>
  );
};

export default signin;
