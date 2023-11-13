import { drawerActionToggle } from "@/modules/drawer/Actions";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "services/combinedReducers";
import { createSuperAdminsRequest } from "@/modules/super-admin/Actions";

const ActionsSuperAdmin = () => {
  const [show, setShow] = useState(false);
  const { drawerActionControl } = useSelector(
    (state: RootState) => state.drawer
  );
  const refEditButton: any = useRef();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    password: "",
    email: "",
    phoneNumber: "",
    role: "SUPER_ADMIN",
  });

  const { password, email, phoneNumber } = values;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    dispatch(createSuperAdminsRequest(values));
  };

  return (
    <Drawer
      onClose={() =>
        dispatch(
          drawerActionToggle(false, drawerActionControl.type, "super-admin")
        )
      }
      isOpen={drawerActionControl.isOpen}
      size='lg'>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader pt='10' zIndex='10000' backgroundColor='white'>
            <Flex align='center'>
              <IconButton
                border='none'
                mr='2'
                mt='1'
                bg='"white"'
                aria-label='Create Admin'
                icon={
                  <GrFormClose
                    color='black'
                    style={{ fontSize: "30px", color: "#345279" }}
                  />
                }
                onClick={() =>
                  dispatch(
                    drawerActionToggle(
                      false,
                      drawerActionControl.type,
                      "super-admin"
                    )
                  )
                }
              />
              <Box as='span' fontWeight='bold' fontSize='28px' color='blue.500'>
                {drawerActionControl.type} Super Admin
              </Box>
              <Spacer />
              <Button
                bg='var(--chakra-colors-primary)'
                color='white'
                onClick={() => refEditButton?.current?.click()}
                isLoading={false}>
                Save
              </Button>
            </Flex>
          </DrawerHeader>
          <DrawerBody mt='8'>
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
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type='text'
                  placeholder='Phone Number'
                  name='phoneNumber'
                  value={phoneNumber}
                  onChange={handleChange}
                />
              </FormControl>
              <Button ref={refEditButton} onClick={onSubmit} hidden={true}>
                Save
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default ActionsSuperAdmin;
