import CreateButton from "@/components/core/buttons/CreateButton";
import DateRange from "@/components/core/dateRange";
import ActionsCustomers from "@/components/drawers/customers/ActionsCustomers";
import CDashboardLayout from "@/components/layout/dashboardLayout/CDashboardLayout";
import CTable from "@/components/table/CTable";
import CustomersReportsEmptyPage from "@/components/tablesData/cust-reports/CustomersReportsEmptyPage";
import CustomersEmptyPage from "@/components/tablesData/customers/CustomersEmptyPage";
import { getAllCustomerReportsRequest } from "@/modules/customer-reports/Actions";
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
import { BiPencil } from "react-icons/bi";
import { CgEyeAlt } from "react-icons/cg";
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import moment from "moment";

const CustomerReports = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [offset, setPage] = useState(0);
  const [size, setPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [filterLength, setFilterLength] = useState(0);
  const [dir, setDir] = useState("asc");
  const [sort, setSort] = useState("createdAt");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selected, setSelected] = useState<any>();
  const [isDateRangeVisible, setIsDateRangeVisible] = useState(false);
  // Check if the tables have data before search
  const [isDataBefore, setIsDataBefore] = useState<boolean>(false);
  const viewData = (data) => {
    setSelected(data);
  };

  const { customerReports, isLoading } = useSelector(
    (state: RootState) => state.customerReports
  );

  //   useEffect(() => {
  //     dispatch(
  //       getAllCustomerReportsRequest({
  //         offset: (parseInt(props.query.idx) - 1) * 10,
  //         size,
  //         searchTerm: router.query.search,
  //       })
  //     );
  //   }, [props.query]);

  //   useEffect(() => {
  //     if (customerReports?.length > 0) setIsDataBefore(true);
  //   }, [customerReports]);

  useEffect(() => {
    dispatch(
      getAllCustomerReportsRequest({
        // dir,
        // sort,
        filterByDateFrom: moment(startDate).format(),
        filterByDateTo: moment(endDate).format(),
      })
    );
  }, [startDate, endDate]);

  const data = customerReports?.map((user: any) => {
    return {
      ...user,
      id: user?._id,
      name: user?.name,
      email: user?.email,
      phone: user?.phoneNumber,
      status: user?.status,
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
    // {
    //   Header: "",
    //   accessor: "Actions",
    // },
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

  console.log({ customerReports, startDate, endDate });
  const totalPage = 2;

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  return (
    <CDashboardLayout
      title='Customer Reports'
      description='Customer Reports'
      count={""}>
      {parseInt(props.query.idx) <= 0 ||
      totalPage < parseInt(props.query.idx) ? (
        <Flex
          w='100%'
          h='80vh'
          align='center'
          justify='center'
          direction='column'>
          <Heading size='lg'>Customer Reports</Heading>
          <Button
            color='blue100'
            bg='blue500'
            mt='5'
            onClick={() => {
              router.push({
                pathname: router.pathname,
                query: { ...router.query, idx: 1 },
              });
            }}>
            Back to Customer Reports
          </Button>
        </Flex>
      ) : (
        <Box bg='#f4f6f9' minH='600px'>
          {isDateRangeVisible && (
            <Box position={"absolute"} top='16%' left='18.5%'>
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
              />
            </Box>
          )}
          <Box p={8}>
            <Button
              colorScheme={"primaryColorScheme"}
              onClick={() => setIsDateRangeVisible((prev) => !prev)}>
              Choose Date Range
            </Button>
          </Box>
          {/* {data?.length === 0 && !isDataBefore && <CustomersReportsEmptyPage />} */}
          {isLoading && <Progress size='xs' isIndeterminate />}
          {data?.length > 0 && (
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
              Title='Customer Reports Management'
              subTitle={`Search, view customer reports.`}
              btnTitle=''
              placeHolder='Search for customers reports...'
              setPage={setPage}
              setPerPage={setPerPage}
              currentpage={pageNumber}
              setPageNumber={setPageNumber}
              perPage={size}
              totalPage={
                // Math.ceil(tablesNumber.length / 10)
                //   ? Math.ceil(tablesNumber.length / 10)
                //   : 1
                2
              }
              searchFn={getAllCustomerReportsRequest}
              idx={parseInt(props.query.idx)}
              headerChildren={undefined}
            />
          )}
        </Box>
      )}
    </CDashboardLayout>
  );
};

export default CustomerReports;

CustomerReports.getInitialProps = async (ctx: { query: any }) => {
  return { query: ctx.query };
};
