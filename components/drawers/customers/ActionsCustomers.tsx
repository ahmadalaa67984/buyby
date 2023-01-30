import {
  createCustomerRequest,
  updateCustomerRequest,
} from "@/modules/customer-accs/Actions";
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
  Spacer,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "services/combinedReducers";

const ActionsCustomers = ({ selected }) => {
  const { drawerActionControl } = useSelector(
    (state: RootState) => state.drawer
  );
  const refEditButton: any = useRef();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    title: "",
  });

  const { title } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    if (drawerActionControl.type === "NEW") {
      dispatch(createCustomerRequest(values));
    } else {
      dispatch(updateCustomerRequest(values));
    }
  };

  return (
    <Drawer
      onClose={() =>
        dispatch(
          drawerActionToggle(false, drawerActionControl.type, "customers")
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
                aria-label='Create Notification'
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
                      "customers"
                    )
                  )
                }
              />
              <Box as='span' fontWeight='bold' fontSize='28px' color='blue.500'>
                {drawerActionControl.type} Customer
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
                <FormLabel>Title</FormLabel>
                <Input
                  type='text'
                  placeholder='Title'
                  name='title'
                  value={title}
                  onChange={handleChange}
                />
              </FormControl>
            </Flex>
            <Button ref={refEditButton} onClick={onSubmit} hidden={true}>
              Save
            </Button>
            {/* <FormIndex
              defaultValues={{}}
              withoutUpload={false}
              withoutTitles={false}
              withoutCheckboxs={false}
              withoutPassword={false}
              title
              subTitle
              schema={notificationSchema}
              action={onSubmit}
              structure={notificationSturcture}>
              <Flex direction='column' mb='10'>
                <Box mt='4' borderTop='1px solid #DDD'>
                  <Button
                    bg='var(--chakra-colors-primary)'
                    color='white'
                    type='submit'
                    mt={4}
                    hidden={true}
                    ref={refEditButton}
                    isLoading={false}>
                    Save
                  </Button>
                </Box>
              </Flex>
            </FormIndex> */}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default ActionsCustomers;
