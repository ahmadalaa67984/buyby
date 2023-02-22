import CreateButton from "@/components/core/buttons/CreateButton";
import DateRange from "@/components/core/dateRange";
import ActionsCustomers from "@/components/drawers/customers/ActionsCustomers";
import CDashboardLayout from "@/components/layout/dashboardLayout/CDashboardLayout";
import CTable from "@/components/table/CTable";
import CustomersReportsEmptyPage from "@/components/tablesData/cust-reports/CustomersReportsEmptyPage";
import CustomersEmptyPage from "@/components/tablesData/customers/CustomersEmptyPage";
import { getAllCustomerReportsRequest } from "@/modules/reports/Actions";
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
import moment from "moment";
import {
  getSubReportsDTDRequest,
  getSubReportsMTMRequest,
} from "@/modules/subscription-reports/Actions";
import AdminAuth from "@/components/auth/AdminAuth";
import SubscriptionsTabs from "@/components/subscriptionsTabs";

const SubscriptionReports = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [offset, setPage] = useState(0);
  const [size, setPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [filterLength, setFilterLength] = useState(0);
  const [dir, setDir] = useState("asc");
  const [sort, setSort] = useState("createdAt");
  const [stateOfDate, setStateOfDate] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [selected, setSelected] = useState<any>();
  const [isDateRangeVisible, setIsDateRangeVisible] = useState(false);
  // Check if the tables have data before search
  const [isDataBefore, setIsDataBefore] = useState<boolean>(false);
  const viewData = (data) => {
    setSelected(data);
  };

  const { subReports, isLoading } = useSelector(
    (state: RootState) => state.subscriptionReports
  );

  useEffect(() => {
    if (stateOfDate[0].startDate && stateOfDate[0].endDate) {
      dispatch(
        getSubReportsMTMRequest({
          firstDate: moment(stateOfDate[0].startDate).format(),
          secondDate: moment(stateOfDate[0].endDate).format(),
        })
      );
    }
  }, [stateOfDate, dispatch]);

  const data = subReports?.map((user: any) => {
    return {
      ...user,
      id: user?._id,
      name: user?.name,
      email: user?.email,
      phone: user?.phoneNumber,
      status: user?.status,
    };
  });

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

  console.log({ subReports, stateOfDate });
  const totalPage = 2;

  return (
    <AdminAuth>
      <CDashboardLayout
        title='Subscription Reports'
        description='Subscription Reports'
        count={""}>
        {parseInt(props.query.idx) <= 0 ||
        totalPage < parseInt(props.query.idx) ? (
          <Flex
            w='100%'
            h='80vh'
            align='center'
            justify='center'
            direction='column'>
            <Heading size='lg'>Subscription Reports</Heading>
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
              Back to Subscription Reports
            </Button>
          </Flex>
        ) : (
          <Box bg='#F3F2F7' minH='600px'>
            <Heading p={8}>Subscription Reports</Heading>
            <Box p={8} position='relative'>
              <SubscriptionsTabs>
                {isDateRangeVisible && (
                  <Box position={"absolute"} top='76%'>
                    <DateRange
                      stateOfDate={stateOfDate}
                      setStateOfDate={setStateOfDate}
                    />
                  </Box>
                )}
                <Box mt={4}>
                  <Button
                    colorScheme={"primaryColorScheme"}
                    onClick={() => setIsDateRangeVisible((prev) => !prev)}>
                    Choose Date Range
                  </Button>
                </Box>
              </SubscriptionsTabs>
            </Box>
            {/* {data?.length === 0 && !isDataBefore && <CustomersReportsEmptyPage />} */}
            {isLoading && <Progress size='xs' isIndeterminate />}
            {data?.length > 0 && (
              <CTable
                selectedData={viewData}
                footerBtnTitle={false}
                noSearchBar={true}
                noFilter={true}
                filterType={null}
                Data={data}
                Columns={columns}
                Actions={<></>}
                // ActionsData={(data) => actions(data)}
                Title='Subscription Reports Management'
                // subTitle={`Search, view customer reports.`}
                btnTitle=''
                // placeHolder='Search for customers reports...'
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
                searchFn={getSubReportsMTMRequest}
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

export default SubscriptionReports;

SubscriptionReports.getInitialProps = async (ctx: { query: any }) => {
  return { query: ctx.query };
};
