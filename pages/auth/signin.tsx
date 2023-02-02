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
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const Signin = () => {
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    email: "mohammed.abdelhady@pharaohsoft.com",
    password: "P@ssw0rd",
  });

  const { password, email } = values;

  const { token, isLoading } = useSelector((state: RootState) => state.auth);
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
      <Flex alignItems={"center"} justifyContent='space-between' h='100vh'>
        <Box bg='red' height={"100%"} width='100%' flex='0.6'>
          <Flex
            height={"100%"}
            width='100%'
            alignItems={"center"}
            justifyContent='center'
            flexDir={"column"}
            bg='#F3F2F7'
            gridGap={5}>
            <Box textAlign={"center"}>
              <Heading color='primary' size='2xl' mb={2}>
                Dashboard
              </Heading>
              <Text color={"gray.400"}>
                Manage your project and team in easy way
              </Text>
            </Box>
            <Box>
              <img src='/images/login.png' alt='login' draggable='false' />
            </Box>
          </Flex>
        </Box>
        <Box bg='#fff' height={"100%"} width='100%' flex='0.4'>
          <Flex
            height={"100%"}
            alignItems={"left"}
            justifyContent='center'
            flexDirection={"column"}
            p='60px'>
            <Heading color={"#000"} size='xl' mb={"100px"}>
              Sign in to Dashboard
            </Heading>
            <Box width={"100%"}>
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
                        bg='none'
                        onClick={() => setShow((prev) => !prev)}>
                        {show ? (
                          <BsEye fontSize={20} />
                        ) : (
                          <BsEyeSlash fontSize={20} />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormLabel textAlign={"right"} py={4} m={0} color='gray.500'>
                    <Link href={"/password/forgot"}>Forgot passwod?</Link>
                  </FormLabel>
                </FormControl>
                <Button
                  onClick={onSubmit}
                  mt='150px'
                  size='lg'
                  colorScheme={"primaryColorScheme"}>
                  {isLoading ? "Signing you in..." : "Sign in"}
                </Button>
                {/* <FormLabel textAlign={"center"} py={2} m={0} color='gray.500'>
                  <Link href={"/auth/signup"}>
                    <Flex gridGap={2} alignItems={'center'} justifyContent='center'>
                      <Text>Doesn’t have an account?</Text>
                      <Text color={"primary"}>Sign Up Now</Text>
                    </Flex>
                  </Link>
                </FormLabel> */}
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </CLayout>
  );
};

export default Signin;
