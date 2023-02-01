import CDashboardLayout from "@/components/layout/dashboardLayout/CDashboardLayout";
import CTable from "@/components/table/CTable";
import LogsEmptyPage from "@/components/tablesData/system-logs/LogsEmptyPage";
import {
  Box,
  Button,
  Divider,
  Flex,
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
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { CgEyeAlt, CgTrash } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSystemLogRequest,
  getAllSystemLogsRequest,
  getSystemLogRequest,
} from "@/modules/system-logs/Actions";
import { RootState } from "@/services/combinedReducers";
import DeleteModel from "@/components/core/modals/DeleteModel";
import DetailsModal from "@/components/core/modals/DetailsModal";
import { ISysLog } from "@/modules/system-logs/interface";
import AdminAuth from "@/components/auth/AdminAuth";

const SystemLogs = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [offset, setPage] = useState(0);
  const [size, setPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [filterLength, setFilterLength] = useState(0);
  const [detailsModal, setDetailsModal] = useState(false);
  const [dir, setDir] = useState("asc");
  const [deleteModal, setDeleteModal] = useState(false);
  const [sort, setSort] = useState("createdAt");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selected, setSelected] = useState<any>();
  // Check if the tables have data before search
  const [isDataBefore, setIsDataBefore] = useState<boolean>(false);
  const viewData = (data) => {
    setSelected(data);
  };

  const { sysLogs, isLoading, singleSysLog } = useSelector(
    (state: RootState) => state.systemLogs
  );

  useEffect(() => {
    dispatch(
      getAllSystemLogsRequest({
        offset: (parseInt(props.query.idx) - 1) * 10,
        size,
        searchTerm: router.query.search,
      })
    );
  }, [props.query, dispatch, router.query.search, size]);

  useEffect(() => {
    if (sysLogs?.length > 0) setIsDataBefore(true);
  }, [sysLogs]);

  useEffect(() => {
    dispatch(
      getAllSystemLogsRequest({
        dir,
        sort,
        filterByDateFrom: startDate,
        filterByDateTo: endDate,
      })
    );
  }, [dir, sort, startDate, endDate, dispatch]);

  const onSubmitDelete = () => {
    dispatch(deleteSystemLogRequest(selected));
  };

  const handleDetails = () => {
    dispatch(getSystemLogRequest(selected));
    setDetailsModal(!detailsModal);
  };

  const data = sysLogs?.map((sysLog: ISysLog) => {
    return {
      ...sysLog,
      id: sysLog?._id,
      action: sysLog?.action,
      username: sysLog?.user?.name,
      email: sysLog?.user?.email,
      role: sysLog?.user?.role,
      // subscriptionType: sysLog?.user?.subscriptionType,
    };
  });

  console.log({ sysLogs, singleSysLog });

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
      Header: "Action",
      accessor: "action",
    },
    {
      Header: "Username",
      accessor: "username",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Role",
      accessor: "role",
    },
    // {
    //   Header: "Subscription Type",
    //   accessor: "subscriptionType",
    // },
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
            <MenuItem
              p={3}
              fontWeight='black'
              _hover={{
                bg: "primary_variants.100",
                color: "primary",
              }}
              icon={<CgTrash fontSize='25px' color='#5211A5' />}
              onClick={() => setDeleteModal(true)}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    );
  };

  // const totalPage = 2;
  const totalPage = Math.ceil(data?.length / 10)
    ? Math.ceil(data?.length / 10)
    : 1;
  console.log({
    selected,
    totalPage,
    idx: props.query.idx,
    data,
    offset,
    size,
  });

  return (
    <AdminAuth>
      <CDashboardLayout
        title='System Logs'
        description='System Logs'
        count={""}>
        {parseInt(props.query.idx) <= 0 ||
        totalPage < parseInt(props.query.idx) ? (
          <Flex
            w='100%'
            h='80vh'
            align='center'
            justify='center'
            direction='column'>
            <Heading size='lg'>System Logs</Heading>
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
              Back to Logs
            </Button>
          </Flex>
        ) : (
          <Box bg='#f4f6f9' minH='600px'>
            {data?.length === 0 && !isDataBefore && <LogsEmptyPage />}
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
                Title='System Logs Management'
                subTitle={`Search, view and delete system logs.`}
                btnTitle=''
                placeHolder='Search for logs...'
                setPage={setPage}
                setPerPage={setPerPage}
                currentpage={pageNumber}
                setPageNumber={setPageNumber}
                perPage={size}
                totalPage={totalPage}
                searchFn={getAllSystemLogsRequest}
                idx={parseInt(props.query.idx)}
                headerChildren={undefined}
              />
            )}
          </Box>
        )}
        <DeleteModel
          name={singleSysLog?.action}
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          onSubmit={onSubmitDelete}
        />
        <DetailsModal
          detailsModal={detailsModal}
          setDetailsModal={setDetailsModal}
          item={singleSysLog}
        />
      </CDashboardLayout>
    </AdminAuth>
  );
};

export default SystemLogs;

SystemLogs.getInitialProps = async (ctx: { query: any }) => {
  return { query: ctx.query };
};
