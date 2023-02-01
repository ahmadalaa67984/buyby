import CLayout from "@/components/layout/CLayout";
import {
  resendVerifyCodeRequest,
  resetPasswordRequest,
  signinRequest,
} from "@/modules/auth/Actions";
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

const ResetPassword = () => {
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    code: "",
    password: "",
    newPassword: "",
  });

  const { code, password, newPassword } = values;

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
    if (!code || !password || !newPassword) {
      return toast.error("Fill in all fields");
    }

    dispatch(resetPasswordRequest(values));
  };

  console.log({ user, token });

  return (
    <CLayout title={"Reset Password"} description='Reset Password'>
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
              Reset Password
            </Heading>
            <Text mb={"20px"} mt={3} fontSize='xl'>
              Enter the code that has been sent to your email and new password.
            </Text>
            <Box width={"100%"} mt='100px'>
              <Flex flexDirection={"column"} gridGap={4}>
                <FormControl>
                  <FormLabel>Code</FormLabel>
                  <Input
                    type='text'
                    placeholder='Code'
                    name='code'
                    value={code}
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
                </FormControl>
                <FormControl>
                  <FormLabel>New Password</FormLabel>
                  <InputGroup size='md'>
                    <Input
                      type={show ? "text" : "password"}
                      placeholder='New Password'
                      name='newPassword'
                      value={newPassword}
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
                </FormControl>

                <FormLabel
                  textAlign={"left"}
                  py={4}
                  m={0}
                  color='primary_variants.700'
                  cursor={"pointer"}
                  onClick={() =>
                    dispatch(
                      resendVerifyCodeRequest({
                        email: localStorage.getItem("email"),
                      })
                    )
                  }>
                  Re-send verification code
                </FormLabel>

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

export default ResetPassword;
