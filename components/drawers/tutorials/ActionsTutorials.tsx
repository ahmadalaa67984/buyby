import { drawerActionToggle } from "@/modules/drawer/Actions";
import {
  createTutorialRequest,
  editTutorialRequest,
} from "@/modules/tutorials/Actions";
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
  Select,
} from "@chakra-ui/react";
import useTranslation from "assets/lang";
import axios from "axios";
import FormIndex from "components/forms/FormIndex";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "services/combinedReducers";
import makeAnimated from "react-select/animated";

const ActionsTutorials = () => {
  const { drawerActionControl } = useSelector(
    (state: RootState) => state.drawer
  );
  const refEditButton: any = useRef();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    url: "",
  });
  const [users, setUsers] = useState([]);
  const [specificUser, setSpecificUser] = useState(false);
  const [selectUsers, setSelectedUsers] = useState([]);
  const animatedComponents = makeAnimated();

  const { name, url } = values;
  const [type, setType] = useState("CUSTOMER");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    if (drawerActionControl.type == "Edit")
      dispatch(
        editTutorialRequest({
          _id: drawerActionControl?.defaultValue?._id,
          name,
          url,
          type,
        })
      );
    else
      dispatch(
        createTutorialRequest({
          name,
          url,
          type,
        })
      );
  };

  useEffect(() => {
    if (drawerActionControl?.defaultValue) {
      setType(drawerActionControl?.defaultValue?.type);
      setValues(drawerActionControl?.defaultValue);
    }
  }, [drawerActionControl]);
  console.log(drawerActionControl?.defaultValue, "defaultValue");
  return (
    <Drawer
      onClose={() =>
        dispatch(
          drawerActionToggle(false, drawerActionControl.type, "tutorial", {})
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
                aria-label='Create Tutorial'
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
                      "tutorial",
                      {}
                    )
                  )
                }
              />
              <Box as='span' fontWeight='bold' fontSize='28px' color='blue.500'>
                {drawerActionControl.type} Tutorial
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
                <FormLabel>Name</FormLabel>
                <Input
                  type='text'
                  placeholder='Name'
                  name='name'
                  value={name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Body</FormLabel>
                <Input
                  type='text'
                  placeholder='Url'
                  name='url'
                  value={url}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value='CUSTOMER'>CUSTOMER</option>
                  <option value='RESTURANT'>RESTURANT</option>
                  <option value='MERCHANT'>MERCHANT</option>
                  <option value='CASHIER'>CASHIER</option>
                  <option value='CHEF'>CHEF</option>
                </Select>
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
              schema={tutorialSchema}
              action={onSubmit}
              structure={tutorialSturcture}>
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

export default ActionsTutorials;
