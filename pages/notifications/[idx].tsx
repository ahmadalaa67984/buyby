import CDashboardLayout from "@/components/layout/dashboardLayout/CDashboardLayout";
import CTable from "@/components/table/CTable";
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
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { CgEyeAlt, CgTrash } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/combinedReducers";
import DeleteModel from "@/components/core/modals/DeleteModel";
import DetailsModal from "@/components/core/modals/DetailsModal";
import {
  deleteNotificationRequest,
  getAllNotificationsRequest,
  getAllUserNotificationsRequest,
  getNotificationRequest,
} from "@/modules/notifications/Actions";
import NotificationDetailsModal from "@/components/core/modals/NotificationDetailsModal";
import { drawerActionToggle } from "@/modules/drawer/Actions";
import CreateButton from "@/components/core/buttons/CreateButton";
import ActionsNotifications from "@/components/drawers/notifications/ActionsNotifications";
import UserNotificationsModal from "@/components/core/modals/UserNotificationsModal";
import axios from "axios";

const NotificationsPage = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [offset, setPage] = useState(0);
  const [size, setPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [filterLength, setFilterLength] = useState(0);
  const [detailsModal, setDetailsModal] = useState(false);
  const [dir, setDir] = useState("asc");
  const [selectedUser, setSelectedUser] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [userNotificationsModal, setUserNotificationsModal] = useState(false);
  const [sort, setSort] = useState("createdAt");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selected, setSelected] = useState<any>();
  // Check if the tables have data before search
  const [isDataBefore, setIsDataBefore] = useState<boolean>(false);
  const viewData = (data) => {
    setSelected(data);
  };

  const { notifications, isLoading, singleNotification } = useSelector(
    (state: RootState) => state.notification
  );

  useEffect(() => {
    if (selectedUser) {
      dispatch(
        getAllUserNotificationsRequest({
          offset: (parseInt(props.query.idx) - 1) * 10,
          size,
          searchTerm: router.query.search,
          // userId: selectedUser,
        })
      );
    } else {
      dispatch(
        getAllNotificationsRequest({
          offset: (parseInt(props.query.idx) - 1) * 10,
          size,
          searchTerm: router.query.search,
        })
      );
    }
  }, [props.query, selectedUser]);

  useEffect(() => {
    if (notifications?.length > 0) setIsDataBefore(true);
  }, [notifications]);

  useEffect(() => {
    if (selectedUser) {
      dispatch(
        getAllUserNotificationsRequest({
          offset: (parseInt(props.query.idx) - 1) * 10,
          size,
          searchTerm: router.query.search,
          // userId: selectedUser,
        })
      );
    } else {
      dispatch(
        getAllNotificationsRequest({
          dir,
          sort,
          filterByDateFrom: startDate,
          filterByDateTo: endDate,
        })
      );
    }
  }, [dir, sort, startDate, endDate, selectedUser]);

  const onSubmitDelete = () => {
    dispatch(deleteNotificationRequest(selected));
  };

  const handleDetails = () => {
    dispatch(getNotificationRequest(selected));
    setDetailsModal(!detailsModal);
  };

  const data = notifications?.map((notify: any) => {
    return {
      ...notify,
      id: notify?._id,
      title: notify?.notificationData?.title,
      body: notify?.notificationData?.body,
      imageUrl: (
        <Box color='blue.500'>
          <a href={notify?.notificationData?.imageUrl} target='_blank'>
            {notify?.notificationData?.imageUrl}
          </a>
        </Box>
      ),
    };
  });

  const users = [];
  const uniqueUserIds = [...new Set(notifications.map((n) => n?.userId))];
  notifications?.map((n) => users.push({ id: n?.userId, name: n?.userName }));

  console.log({ notifications, users, uniqueUserIds });

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
      <Box mt={4}>
        <Select
          placeholder='Select user'
          value={selectedUser}
          onChange={(e) => {
            setSelectedUser(e.target.value);
            console.log(e.target.value);
          }}>
          {users?.map((user: any) => (
            <option key={user?.id} value={user?.id}>
              {user?.id}
            </option>
          ))}
        </Select>
      </Box>
    </Box>
  );

  const columns = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Description",
      accessor: "body",
    },
    {
      Header: "Image URL",
      accessor: "imageUrl",
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
                bg: "gray.200",
                color: "blue.500",
              }}
              icon={<CgEyeAlt fontSize='25px' color='#126890' />}
              onClick={() => handleDetails()}>
              See Details
            </MenuItem>
            <MenuItem
              p={3}
              fontWeight='black'
              _hover={{
                bg: "gray.200",
                color: "blue.500",
              }}
              icon={<CgTrash fontSize='25px' color='#126890' />}
              onClick={() => setDeleteModal(true)}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    );
  };

  console.log({ selected });
  const totalPage = 2;

  console.log({ props });

  return (
    <CDashboardLayout
      title='Notifications'
      description='Notifications'
      count={""}>
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
        Title='Notifications Management'
        subTitle={`Create, search, view and delete notifications.`}
        btnTitle=''
        placeHolder='Search for notifications...'
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
        searchFn={getAllNotificationsRequest}
        idx={parseInt(props.query.idx)}
        headerChildren={() => (
          <>
            <CreateButton
              btnTitle='Create Notification'
              onClick={() =>
                dispatch(drawerActionToggle(true, "New", "notification"))
              }
            />
          </>
        )}
      />
      {/* {parseInt(props.query.idx) <= 0 ||
      totalPage < parseInt(props.query.idx) ? (
        <Flex
          w='100%'
          h='80vh'
          align='center'
          justify='center'
          direction='column'>
          <Heading size='lg'>Notifications</Heading>
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
            Back to Notifications
          </Button>
        </Flex>
      ) : (
        <Box bg='#f4f6f9' minH='600px'>
          {data?.length === 0 && !isDataBefore && <NotificationsPage />}
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
              Title='Notifications Management'
              subTitle={`Create, search, view and delete notifications.`}
              btnTitle=''
              placeHolder='Search for notifications...'
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
              searchFn={getAllNotificationsRequest}
              idx={parseInt(props.query.idx)}
              headerChildren={() => (
                <>
                  <CreateButton
                    btnTitle='Create Notification'
                    onClick={() =>
                      dispatch(drawerActionToggle(true, "New", "notification"))
                    }
                  />
                </>
              )}
            />
          )}
        </Box>
      )} */}
      <ActionsNotifications />
      <DeleteModel
        name={singleNotification?.action}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        onSubmit={onSubmitDelete}
      />
      <NotificationDetailsModal
        detailsModal={detailsModal}
        setDetailsModal={setDetailsModal}
        item={singleNotification}
      />
      {/* <UserNotificationsModal
        userNotificationsModal={userNotificationsModal}
        setUserNotificationsModal={setUserNotificationsModal}
        userNotifications={userNotifications}
      /> */}
    </CDashboardLayout>
  );
};

export default NotificationsPage;

NotificationsPage.getInitialProps = async (ctx: { query: any }) => {
  return { query: ctx.query };
};
