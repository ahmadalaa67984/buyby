import {
  notificationSchema,
  notificationSturcture,
} from "@/form_structure/notifications";
import { drawerActionToggle } from "@/modules/drawer/Actions";
import { createNotificationRequest } from "@/modules/notifications/Actions";
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
  Switch,
  Textarea,
} from "@chakra-ui/react";
import useTranslation from "assets/lang";
import axios from "axios";
import FormIndex from "components/forms/FormIndex";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "services/combinedReducers";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { extractErrorMsgFromResponse } from "@/utils/apiHelpers";
import { toast } from "react-toastify";

const ActionsSMS = ({ isOpen, onOpen, onClose }) => {
  const refEditButton: any = useRef();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    title: "",
    body: "",
    imageUrl: "",
    allCustomers: false,
    allBusinessOwners: false,
  });
  const [users, setUsers] = useState([]);
  const [specificUser, setSpecificUser] = useState(false);
  const [selectUsers, setSelectedUsers] = useState([]);
  const animatedComponents = makeAnimated();

  const { title, body, imageUrl, allBusinessOwners, allCustomers } = values;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    dispatch(
      createNotificationRequest({
        notificationData: {
          title,
          body,
          imageUrl,
        },
        allBusinessOwners,
        allCustomers,
        userIds: selectUsers?.map((u) => u.value),
      })
    );
  };

  const fetchUsers = async () => {
    await axios
      .post("/users/search", {
        offset: 10,
        size: 10,
      })
      .then((res) => {
        setUsers(res.data.content);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createSMS = async () => {
    try {
      await axios.post("/etisalat-sms/bulk-sms", {
        message: body,
        allBusinessOwners,
        allCustomers,
        userIds: selectUsers?.map((u) => u.value),
      });
      toast.success("SMS sended successfully");
      onClose();
    } catch (error) {
      extractErrorMsgFromResponse(error);
    }
  };
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size='lg'>
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
                onClick={onClose}
              />
              <Box as='span' fontWeight='bold' fontSize='28px' color='blue.500'>
                Create SMS
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
                <FormLabel>Body</FormLabel>
                <Textarea
                  type='text'
                  placeholder='Body'
                  name='body'
                  value={body}
                  onChange={handleChange}
                />
              </FormControl>

              <Flex gridGap={2} alignItems='center'>
                <FormControl display='flex' alignItems='center'>
                  <FormLabel htmlFor='allBusinessOwners' mb='0'>
                    All Business Owners?
                  </FormLabel>
                  <Switch
                    id='allBusinessOwners'
                    name='allBusinessOwners'
                    value={allBusinessOwners}
                    isChecked={allBusinessOwners}
                    disabled={specificUser}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        allBusinessOwners: e.target.checked,
                      })
                    }
                  />
                </FormControl>
                <FormControl display='flex' alignItems='center'>
                  <FormLabel htmlFor='allCustomers' mb='0'>
                    All Customers?
                  </FormLabel>
                  <Switch
                    id='allCustomers'
                    name='allCustomers'
                    value={allCustomers}
                    isChecked={allCustomers}
                    disabled={specificUser}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        allCustomers: e.target.checked,
                      })
                    }
                  />
                </FormControl>
              </Flex>
              <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor='specificUser' mb='0'>
                  Specific Users?
                </FormLabel>
                <Switch
                  id='specificUser'
                  value={specificUser}
                  isChecked={specificUser}
                  disabled={allBusinessOwners || allCustomers}
                  onChange={(e) => setSpecificUser(e.target.checked)}
                />
              </FormControl>
              {specificUser && (
                <FormControl>
                  <FormLabel htmlFor='users' mb='2'>
                    Select Users
                  </FormLabel>
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={[]}
                    isMulti
                    onChange={(e) => setSelectedUsers(e)}
                    options={users?.map((user) => {
                      return {
                        value: user?._id,
                        label: user?.name,
                      };
                    })}
                  />
                </FormControl>
              )}
            </Flex>
            <Button ref={refEditButton} onClick={createSMS} hidden={true}>
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

export default ActionsSMS;
