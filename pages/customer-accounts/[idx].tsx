import AdminAuth from "@/components/auth/AdminAuth";
import CreateButton from "@/components/core/buttons/CreateButton";
import ActionsCustomers from "@/components/drawers/customers/ActionsCustomers";
import CDashboardLayout from "@/components/layout/dashboardLayout/CDashboardLayout";
import CTable from "@/components/table/CTable";
import CustomersEmptyPage from "@/components/tablesData/customers/CustomersEmptyPage";
import {
  applyRecievePromotionRequest,
  getAllCustomerRequest,
  getCustomerRequest,
} from "@/modules/customer-accs/Actions";
import { ICustomer } from "@/modules/customer-accs/interface";
import { drawerActionToggle } from "@/modules/drawer/Actions";
import { activateUserRequest } from "@/modules/super-admin/Actions";
import { RootState } from "@/services/combinedReducers";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { CgEyeAlt } from "react-icons/cg";
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

const CustomerAccounts = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [offset, setPage] = useState(0);
  const [size, setPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [filterLength, setFilterLength] = useState(0);
  const [detailsModal, setDetailsModal] = useState(false);
  const [dir, setDir] = useState("asc");
  const [sort, setSort] = useState("createdAt");
  const [isRecievePromotional, setIsRecievePromotional] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selected, setSelected] = useState<any>();
  // Check if the tables have data before search
  const [isDataBefore, setIsDataBefore] = useState<boolean>(false);
  const viewData = (data) => {
    setSelected(data);
  };

  const { customerAccs, isLoading, numberOfCustomerAcc } = useSelector(
    (state: RootState) => state.customer
  );

  useEffect(() => {
    dispatch(
      getAllCustomerRequest({
        offset: (parseInt(props.query.idx) - 1) * 10,
        size,
        searchTerm: router.query.search,
      })
    );
  }, [props.query, dispatch, router.query.search, size]);

  useEffect(() => {
    if (customerAccs?.length > 0) setIsDataBefore(true);
  }, [customerAccs]);

  useEffect(() => {
    dispatch(
      getAllCustomerRequest({
        dir,
        sort,
        filterByDateFrom: startDate,
        filterByDateTo: endDate,
      })
    );
  }, [dir, sort, startDate, endDate, dispatch]);

  // const handleDetails = () => {
  //   dispatch(getCustomerRequest(selected));
  //   setDetailsModal(!detailsModal);
  // };

  const handlePromotion = async ({
    id,
    receivePromotionalMessagesOrDiscounts,
  }: {
    id: string;
    receivePromotionalMessagesOrDiscounts: boolean;
  }) => {
    try {
      await axios.patch(`users/update-promotional-messages-discounts/${id}`, {
        receivePromotionalMessagesOrDiscounts,
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const data = customerAccs?.map((user: ICustomer) => {
    return {
      ...user,
      id: user?._id,
      name: user?.name,
      email: user?.email,
      phone: user?.phoneNumber,
      status: user?.status,
      rp: (
        <Box color='blue.500'>
          <FormControl display='flex' alignItems='center'>
            <Switch
              defaultChecked={user?.receivePromotionalMessagesOrDiscounts}
              onChange={(e) => {
                handlePromotion({
                  id: user?._id,
                  receivePromotionalMessagesOrDiscounts: e.target.checked,
                });
              }}
            />
          </FormControl>
        </Box>
      ),
      actions: (
        <FormControl display='flex' gridGap={4} alignItems='center' mt={4}>
          <Switch
            defaultChecked={user?.active}
            onChange={(e) =>
              dispatch(
                activateUserRequest({
                  active: e.target.checked,
                  _id: user?._id,
                })
              )
            }
          />
          <FormLabel>{user?.active ? "Active" : "Inactive"}</FormLabel>
        </FormControl>
      ),
    };
  });

  const filterList = (
    <Box p='5'>
      <RadioGroup onChange={(e) => setDir(e)} defaultValue={dir}>
        <Text as='b'>Sort by direction</Text>
        <Stack direction='row' mt={"3"}>
          <Radio value='asc'>Ascending</Radio>
          <Radio value='desc'>Descending</Radio>
        </Stack>
      </RadioGroup>
      <Divider p='2' />
      <RadioGroup onChange={(e) => setSort(e)} defaultValue={sort} mt='2'>
        <Text as='b'>Sort by time</Text>
        <Stack direction='row' mt={"3"}>
          <Radio value='createdAt'>By creation</Radio>
          <Radio value='updatedAt'>By update</Radio>
        </Stack>
      </RadioGroup>
      <Divider p='2' mb='2' />
      <Text as='b'>Sort in range</Text>
      <Box mt={"3"}>
        <Text p='1'>From:</Text>
        <Input
          type={"date"}
          onChange={(e) => setStartDate(e.target.valueAsDate)}
        />
      </Box>
      <Box>
        <Text p='1'>To:</Text>
        <Input
          type={"date"}
          onChange={(e) => setEndDate(e.target.valueAsDate)}
        />
      </Box>
    </Box>
  );

  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone Number",
      accessor: "phone",
    },
    {
      Header: "Recieve Promotional?",
      accessor: "rp",
    },
    {
      Header: "Activation",
      accessor: "actions",
    },
  ];

  // const actions = (data) => {
  //   return (
  //     <Flex justify='space-between'>
  //       <Menu>
  //         <MenuButton
  //           as={IconButton}
  //           aria-label='Title'
  //           icon={<HiDotsVertical />}
  //           size='sm'
  //           fontSize='20px'
  //           variant='outline'
  //           border='none'
  //         />
  //         <MenuList p={0}>
  //           <MenuItem
  //             p={3}
  //             fontWeight='black'
  //             _hover={{
  //               bg: "gray.200",
  //               color: "blue.500",
  //             }}
  //             icon={<CgEyeAlt fontSize='25px' color='#126890' />}
  //             onClick={() => handleDetails()}>
  //             See Details
  //           </MenuItem>
  //           <MenuItem
  //             p={3}
  //             fontWeight='black'
  //             _hover={{
  //               bg: "gray.200",
  //               color: "blue.500",
  //             }}
  //             icon={<BiPencil fontSize='25px' color='#126890' />}
  //             onClick={() =>
  //               dispatch(drawerActionToggle(true, "EDIT", "customers"))
  //             }>
  //             Edit
  //           </MenuItem>
  //         </MenuList>
  //       </Menu>
  //     </Flex>
  //   );
  // };

  console.log({ customerAccs });
  const totalPage = Math.ceil(numberOfCustomerAcc / 10)
    ? Math.ceil(numberOfCustomerAcc / 10)
    : 1;

  return (
    <AdminAuth>
      <CDashboardLayout
        title='Customer Accounts'
        description='Customer Accounts'
        count={""}>
        {parseInt(props.query.idx) <= 0 ||
        totalPage < parseInt(props.query.idx) ? (
          <Flex
            w='100%'
            h='80vh'
            align='center'
            justify='center'
            direction='column'>
            <Heading size='lg'>Customer Accounts</Heading>
            <Button
              color='blue.500'
              bg='blue500'
              mt='5'
              onClick={() => {
                router.push({
                  pathname: router.pathname,
                  query: { ...router.query, idx: 1 },
                });
              }}>
              Back to Customer Accounts
            </Button>
          </Flex>
        ) : (
          <Box bg='#f4f6f9' minH='600px'>
            {data?.length === 0 && !isDataBefore && <CustomersEmptyPage />}
            {isLoading && <Progress size='xs' isIndeterminate />}

            {isDataBefore && (
              <CTable
                selectedData={viewData}
                footerBtnTitle={false}
                noSearchBar={false}
                noFilter={false}
                filterList={filterList}
                filterLength={filterLength}
                filterType={null}
                Data={data}
                Columns={columns}
                Actions={<></>}
                // ActionsData={(data) => actions(data)}
                Title='Customers Management'
                subTitle={`Search, view customers.`}
                btnTitle=''
                placeHolder='Search for customers...'
                setPage={setPage}
                setPerPage={setPerPage}
                currentpage={pageNumber}
                setPageNumber={setPageNumber}
                perPage={size}
                totalPage={totalPage}
                searchFn={getAllCustomerRequest}
                idx={parseInt(props.query.idx)}
                headerChildren={undefined}
              />
            )}
          </Box>
        )}
      </CDashboardLayout>
    </AdminAuth>
  );
};

export default CustomerAccounts;

CustomerAccounts.getInitialProps = async (ctx: { query: any }) => {
  return { query: ctx.query };
};
