import CLayout from "@/components/layout/CLayout";
import { forgotPasswordRequest, signinRequest } from "@/modules/auth/Actions";
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
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
  });

  const { email } = values;

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
    if (!email) {
      return toast.error("Type your email address");
    }

    dispatch(forgotPasswordRequest(values));

    localStorage.setItem("email", email);
  };

  console.log({ user, token });

  return (
    <CLayout title={"Forgot Password"} description='Forgot Password'>
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
              <img
                src='/images/forgot-password.png'
                alt='forgot password'
                draggable='false'
              />
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
            <Heading color={"#000"} size='xl'>
              Forgot Password
            </Heading>
            <Text mb={"20px"} mt={3} fontSize='xl'>
              Enter your email address below to send a link to begin the reset
              process
            </Text>
            <Box width={"100%"} mt='100px'>
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

                <Button
                  onClick={onSubmit}
                  mt='150px'
                  size='lg'
                  colorScheme={"primaryColorScheme"}>
                  {isLoading ? "Loading..." : "Submit"}
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </CLayout>
  );
};

export default ForgotPassword;
