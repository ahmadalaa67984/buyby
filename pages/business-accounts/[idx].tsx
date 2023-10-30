import CreateButton from "@/components/core/buttons/CreateButton";
import ActionsCustomers from "@/components/drawers/customers/ActionsCustomers";
import CDashboardLayout from "@/components/layout/dashboardLayout/CDashboardLayout";
import CTable from "@/components/table/CTable";
import BusinessEmptyPage from "@/components/tablesData/business/BusinessEmptyPage";
import CustomersEmptyPage from "@/components/tablesData/customers/CustomersEmptyPage";
import {
  getAllBusinessAccountsRequest,
  getUserByIdRequest,
} from "@/modules/business-accs/Actions";
import { IBusiness } from "@/modules/business-accs/interface";
import {
  getAllCustomerRequest,
  getCustomerRequest,
} from "@/modules/customer-accs/Actions";
import { drawerActionToggle } from "@/modules/drawer/Actions";
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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CgEyeAlt } from "react-icons/cg";
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import DetailsModal from "@/components/core/modals/DetailsModal";
import BusinessAccountModal from "@/components/core/modals/BusinessAccountModal";
import AdminAuth from "@/components/auth/AdminAuth";
import { activateUserRequest } from "@/modules/super-admin/Actions";

const BusinessAccounts = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [offset, setPage] = useState(0);
  const [size, setPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [filterLength, setFilterLength] = useState(0);
  const [detailsModal, setDetailsModal] = useState(false);
  const [dir, setDir] = useState("asc");
  const [sort, setSort] = useState("createdAt");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selected, setSelected] = useState<any>();
  // Check if the tables have data before search
  const [isDataBefore, setIsDataBefore] = useState<boolean>(false);
  const viewData = (data) => {
    setSelected(data);
  };

  const { businessAccs, isLoading, singleUser, numberOfBusinessAcc } =
    useSelector((state: RootState) => state.bussines);

  useEffect(() => {
    dispatch(
      getAllBusinessAccountsRequest({
        offset: (parseInt(router.query.idx) - 1) * 10,
        size,
        searchTerm: router.query.search,
      })
    );
  }, [router.query, dispatch, router.query.search, size]);

  useEffect(() => {
    if (businessAccs?.length > 0) setIsDataBefore(true);
  }, [businessAccs]);

  useEffect(() => {
    dispatch(
      getAllBusinessAccountsRequest({
        dir,
        sort,
        filterByDateFrom: startDate,
        filterByDateTo: endDate,
      })
    );
  }, [dir, sort, startDate, endDate, dispatch]);

  console.log({ selected });
  const handleDetails = () => {
    dispatch(getUserByIdRequest(selected));
    setDetailsModal(!detailsModal);
  };

  const data = businessAccs?.map((b: IBusiness) => {
    return {
      ...b,
      id: b?._id,
      bname: b?.name,
      address: b?.address,
      // type: b?.subscriptionType,
      cphone: b?.phoneNumber,
      rnumber: b?.registrationNumber,
      actions: (
        <FormControl display='flex' gridGap={4} alignItems='center' mt={4}>
          <Switch
            defaultChecked={b?.active}
            onChange={(e) =>
              dispatch(
                activateUserRequest({
                  active: e.target.checked,
                  _id: b?._id,
                })
              )
            }
          />
          <FormLabel>{b?.active ? "Active" : "Inactive"}</FormLabel>
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
      accessor: "bname",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    // {
    //   Header: "Type",
    //   accessor: "type",
    // },
    {
      Header: "Contact Phone",
      accessor: "cphone",
    },
    {
      Header: "Register Number",
      accessor: "rnumber",
    },
    {
      Header: "Activation",
      accessor: "actions",
    },
    {
      Header: "",
      accessor: "Actions",
    },
  ];

  const actions = (data) => {
    return (
      <Flex justify='space-between'>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Title'
            icon={<HiDotsVertical />}
            size='sm'
            fontSize='20px'
            variant='outline'
            border='none'
          />
          <MenuList p={0}>
            <MenuItem
              p={3}
              fontWeight='black'
              _hover={{
                bg: "primary_variants.100",
                color: "primary",
              }}
              icon={<CgEyeAlt fontSize='25px' color='#5211A5' />}
              onClick={() => handleDetails()}>
              See Details
            </MenuItem>
            {/* <MenuItem
                p={3}
                fontWeight='black'
                 _hover={{
                bg: "primary_variants.100",
                color: "primary",
              }}
                icon={<CgEyeAlt fontSize='25px' color='#126890' />}
                onClick={() =>
                  dispatch(drawerActionToggle(true, "EDIT", "customers"))
                }>
                Edit
              </MenuItem> */}
          </MenuList>
        </Menu>
      </Flex>
    );
  };

  console.log({ businessAccs, singleUser });
  const totalPage = Math.ceil(numberOfBusinessAcc / 10)
    ? Math.ceil(numberOfBusinessAcc / 10)
    : 1;

  return (
    <AdminAuth>
      <CDashboardLayout
        title='Business Accounts'
        description='Business Accounts'
        count={""}>
        {parseInt(router.query.idx) <= 0 ||
        totalPage < parseInt(router.query.idx) ? (
          <Flex
            w='100%'
            h='80vh'
            align='center'
            justify='center'
            direction='column'>
            <Heading size='lg'>Business Accounts</Heading>
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
              Back to Business Accounts
            </Button>
          </Flex>
        ) : (
          <Box bg='#f4f6f9' minH='600px'>
            {data?.length === 0 && !isDataBefore && <BusinessEmptyPage />}
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
                ActionsData={(data) => actions(data)}
                Title='Businesses Accounts Management'
                subTitle={`Search, view business accounts.`}
                btnTitle=''
                placeHolder='Search for business accounts...'
                setPage={setPage}
                setPerPage={setPerPage}
                currentpage={pageNumber}
                setPageNumber={setPageNumber}
                perPage={size}
                totalPage={totalPage}
                searchFn={getAllBusinessAccountsRequest}
                idx={parseInt(router.query.idx)}
                headerChildren={undefined}
              />
            )}
          </Box>
        )}
        <BusinessAccountModal
          detailsModal={detailsModal}
          setDetailsModal={setDetailsModal}
          item={singleUser}
        />
      </CDashboardLayout>
    </AdminAuth>
  );
};

export default BusinessAccounts;

BusinessAccounts.getInitialProps = async (ctx: { query: any }) => {
  return { query: ctx.query };
};
