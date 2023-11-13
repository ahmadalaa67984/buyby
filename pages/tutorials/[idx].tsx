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
  useDisclosure,
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
  deleteTutorialRequest,
  getAllTutorialsRequest,
  getAllUserTutorialsRequest,
  getTutorialRequest,
} from "@/modules/tutorials/Actions";
import TutorialDetailsModal from "@/components/core/modals/TutorialDetailsModal";
import { drawerActionToggle } from "@/modules/drawer/Actions";
import ActionsTutorials from "@/components/drawers/tutorials/ActionsTutorials";
import axios from "axios";
import { ITutorial } from "@/modules/tutorials/interface";
import AdminAuth from "@/components/auth/AdminAuth";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { extractErrorMsgFromResponse } from "@/utils/apiHelpers";
import { pushQuery } from "@/utils";
import { AiOutlineEdit } from "react-icons/ai";

const TutorialsPage = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [offset, setPage] = useState(0);
  const [size, setPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [filterLength, setFilterLength] = useState(0);
  const [detailsModal, setDetailsModal] = useState(false);
  const [dir, setDir] = useState("desc");
  const [selectedUser, setSelectedUser] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [userTutorialsModal, setUserTutorialsModal] = useState(false);
  const [sort, setSort] = useState("updatedAt");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selected, setSelected] = useState<any>();
  // Check if the tables have data before search
  const [isDataBefore, setIsDataBefore] = useState<boolean>(false);
  const viewData = (data) => {
    setSelected(data);
  };

  const { tutorials, isLoading, singleTutorial, numberOfTutorials } =
    useSelector((state: RootState) => state.tutorial);

  useEffect(() => {
    if (tutorials?.length > 0) setIsDataBefore(true);
  }, [tutorials]);

  useEffect(() => {
    let timeId = setTimeout(() => {
      if (selectedUser) {
        dispatch(
          getAllUserTutorialsRequest({
            id: selectedUser,
            formData: {
              offset: (parseInt(router.query.idx) - 1) * 10,
              size: parseInt(router?.query?.size || size),
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
          getAllTutorialsRequest({
            offset: (parseInt(router.query.idx) - 1) * 10,
            size: parseInt(router?.query?.size || size),
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
    router.query.size,
  ]);

  const onSubmitDelete = () => {
    dispatch(deleteTutorialRequest(selected));
  };

  const handleDetails = () => {
    dispatch(getTutorialRequest(selected));
    setDetailsModal(!detailsModal);
  };

  const data = tutorials?.map((tutorial: ITutorial) => {
    return {
      ...tutorial,
      id: tutorial?._id,
      title: tutorial?.tutorialData?.title,
      body: tutorial?.tutorialData?.body,
      date: new Date(tutorial?.createdAt)?.toLocaleDateString(),

      imageUrl: (
        <Box color='blue.500'>
          <a
            href={tutorial?.tutorialData?.imageUrl}
            target='_blank'
            rel='noopener noreferrer'>
            {tutorial?.tutorialData?.imageUrl}
          </a>
        </Box>
      ),
    };
  });

  let users = [
    ...new Map(tutorials?.map((item) => [item["userId"], item])).values(),
  ];

  console.log({ tutorials, selectedUser });

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
      <Text as='b'>Size</Text>
      <Select
        value={parseInt(router?.query?.size || 10)}
        onChange={(e) => {
          pushQuery(router, { size: e.target.value });
        }}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </Select>
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
          User Tutorials
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
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "URL",
      accessor: "url",
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Date Created",
      accessor: "date",
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
              icon={<AiOutlineEdit fontSize='25px' color='#5211A5' />}
              onClick={() =>
                dispatch(drawerActionToggle(true, "Edit", "tutorial", data))
              }>
              Edit
            </MenuItem>{" "}
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
  console.log({ props, numberOfTutorials });

  const totalPage = Math.ceil(numberOfTutorials - data?.length) + 1 || 1;

  return (
    <AdminAuth>
      <CDashboardLayout title='Tutorials' description='Tutorials' count={""}>
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
          Title='Tutorials Management'
          subTitle={`Create, search, view and delete tutorials.`}
          btnTitle=''
          placeHolder='Search for tutorials...'
          setPage={setPage}
          setPerPage={setPerPage}
          currentpage={pageNumber}
          setPageNumber={setPageNumber}
          perPage={size}
          totalPage={totalPage}
          searchFn={
            selectedUser ? getAllTutorialsRequest : getAllTutorialsRequest
          }
          idx={parseInt(router.query.idx)}
          headerChildren={() => (
            <>
              <Button
                size='lg'
                bg='primary'
                color='white'
                onClick={() =>
                  dispatch(drawerActionToggle(true, "New", "tutorial"))
                }>
                Create
              </Button>
              {/* <CreateButton
                btnTitle='Create Tutorial'
                onClick={() =>
                  dispatch(drawerActionToggle(true, "New", "tutorial"))
                }
              /> */}
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
          <Heading size='lg'>Tutorials</Heading>
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
            Back to Tutorials
          </Button>
        </Flex>
      ) : (
        <Box bg='#f4f6f9' minH='600px'>
          {data?.length === 0 && !isDataBefore && <TutorialsEmptyPage />}
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
              Title='Tutorials Management'
              subTitle={`Create, search, view and delete tutorials.`}
              btnTitle=''
              placeHolder='Search for tutorials...'
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
              searchFn={getAllTutorialsRequest}
              idx={parseInt(router.query.idx)}
              headerChildren={() => (
                <>
                  <CreateButton
                    btnTitle='Create Tutorial'
                    onClick={() =>
                      dispatch(drawerActionToggle(true, "New", "tutorial"))
                    }
                  />
                </>
              )}
            />
          )}
        </Box>
      )} */}
        <ActionsTutorials />

        <DeleteModel
          name={singleTutorial?.action}
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          onSubmit={onSubmitDelete}
        />
        <TutorialDetailsModal
          detailsModal={detailsModal}
          setDetailsModal={setDetailsModal}
          item={singleTutorial}
        />
        {/* <UserTutorialsModal
        userTutorialsModal={userTutorialsModal}
        setUserTutorialsModal={setUserTutorialsModal}
        userTutorials={userTutorials}
      /> */}
      </CDashboardLayout>
    </AdminAuth>
  );
};

export default TutorialsPage;

TutorialsPage.getInitialProps = async (ctx: { query: any }) => {
  return { query: ctx.query };
};
