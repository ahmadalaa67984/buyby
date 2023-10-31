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
import NotificationsEmptyPage from "@/components/tablesData/notifications/NotificationsEmptyPage";
import { INotification } from "@/modules/notifications/interface";
import AdminAuth from "@/components/auth/AdminAuth";

const NotificationsPage = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [offset, setPage] = useState(0);
  const [size, setPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [filterLength, setFilterLength] = useState(0);
  const [detailsModal, setDetailsModal] = useState(false);
  const [dir, setDir] = useState("desc");
  const [selectedUser, setSelectedUser] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [userNotificationsModal, setUserNotificationsModal] = useState(false);
  const [sort, setSort] = useState("updatedAt");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selected, setSelected] = useState<any>();
  // Check if the tables have data before search
  const [isDataBefore, setIsDataBefore] = useState<boolean>(false);
  const viewData = (data) => {
    setSelected(data);
  };

  const {
    notifications,
    isLoading,
    singleNotification,
    numberOfNotifications,
  } = useSelector((state: RootState) => state.notification);

  useEffect(() => {
    if (notifications?.length > 0) setIsDataBefore(true);
  }, [notifications]);

  useEffect(() => {
    let timeId = setTimeout(() => {
      if (selectedUser) {
        dispatch(
          getAllUserNotificationsRequest({
            id: selectedUser,
            formData: {
              offset: (parseInt(router.query.idx) - 1) * 10,
              size,
              searchTerm: router.query.search,
              dir,
              sort,
              filterByDateFrom: startDate,
              filterByDateTo: endDate,
            },
          })
        );
      } else {
        dispatch(
          getAllNotificationsRequest({
            offset: (parseInt(router.query.idx) - 1) * 10,
            size,
            dir,
            sort,
            searchTerm: router.query.search,
            filterByDateFrom: startDate,
            filterByDateTo: endDate,
          })
        );
      }
    }, 500);
  }, [
    dir,
    sort,
    startDate,
    endDate,
    selectedUser,
    dispatch,
    router.query.idx,
    size,
    router.query.search,
  ]);

  const onSubmitDelete = () => {
    dispatch(deleteNotificationRequest(selected));
  };

  const handleDetails = () => {
    dispatch(getNotificationRequest(selected));
    setDetailsModal(!detailsModal);
  };

  const data = notifications?.map((notify: INotification) => {
    return {
      ...notify,
      id: notify?._id,
      title: notify?.notificationData?.title,
      body: notify?.notificationData?.body,
      imageUrl: (
        <Box color='blue.500'>
          <a
            href={notify?.notificationData?.imageUrl}
            target='_blank'
            rel='noopener noreferrer'>
            {notify?.notificationData?.imageUrl}
          </a>
        </Box>
      ),
    };
  });

  let users = [
    ...new Map(notifications?.map((item) => [item["userId"], item])).values(),
  ];

  console.log({ notifications, selectedUser });

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
        <Text as='b' p={"1"}>
          User Notifications
        </Text>
        <Select
          mt={2}
          placeholder='Select user'
          value={selectedUser}
          onChange={(e) => {
            setSelectedUser(e.target.value);
            console.log(e.target.value);
          }}>
          {users?.map((user: any) => (
            <option key={user?.userId} value={user?.userId}>
              {user?.userName}
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

  console.log({ selected });
  console.log({ props, numberOfNotifications });

  const totalPage = Math.ceil(numberOfNotifications / 10)
    ? Math.ceil(numberOfNotifications / 10)
    : 1;

  return (
    <AdminAuth>
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
          totalPage={totalPage}
          searchFn={
            selectedUser
              ? getAllNotificationsRequest
              : getAllNotificationsRequest
          }
          idx={parseInt(router.query.idx)}
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
        {/* {parseInt(router.query.idx) <= 0 ||
      totalPage < parseInt(router.query.idx) ? (
        <Flex
          w='100%'
          h='80vh'
          align='center'
          justify='center'
          direction='column'>
          <Heading size='lg'>Notifications</Heading>
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
            Back to Notifications
          </Button>
        </Flex>
      ) : (
        <Box bg='#f4f6f9' minH='600px'>
          {data?.length === 0 && !isDataBefore && <NotificationsEmptyPage />}
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
              idx={parseInt(router.query.idx)}
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
    </AdminAuth>
  );
};

export default NotificationsPage;

NotificationsPage.getInitialProps = async (ctx: { query: any }) => {
  return { query: ctx.query };
};
