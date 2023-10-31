import CDashboardLayout from "@/components/layout/dashboardLayout/CDashboardLayout";
import CTable from "@/components/table/CTable";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Image,
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
  deleteStockitemRequest,
  getAllStockitemRequest,
  getAllUserStockitemRequest,
  getStockitemRequest,
} from "@/modules/stockitems/Actions";
import { drawerActionToggle } from "@/modules/drawer/Actions";
import CreateButton from "@/components/core/buttons/CreateButton";
import axios from "axios";
import AdminAuth from "@/components/auth/AdminAuth";
import { AiOutlineEdit } from "react-icons/ai";
import { extractErrorMsgFromResponse } from "@/utils/apiHelpers";
import { pushQuery } from "@/utils";

const StockitemsPage = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [offset, setPage] = useState(0);
  const [size, setPerPage] = useState(30);
  const [pageNumber, setPageNumber] = useState(0);
  const [filterLength, setFilterLength] = useState(0);
  const [detailsModal, setDetailsModal] = useState(false);
  const [dir, setDir] = useState("desc");
  const [selectedUser, setSelectedUser] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [userStockitemsModal, setUserStockitemsModal] = useState(false);
  const [sort, setSort] = useState("updatedAt");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selected, setSelected] = useState<any>();
  // Check if the tables have data before search
  const [isDataBefore, setIsDataBefore] = useState<boolean>(false);
  const [stockitems, setStockItems] = useState([]);
  const [numberOfStockItems, setNumberStockItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const viewData = (data) => {
    setSelected(data);
  };

  const getItems = async (body) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `/stock-item-data/customer/search`,
        body
      );
      setStockItems([...stockitems, ...data?.content]);
      setNumberStockItems(data?.count);
    } catch (error) {
      extractErrorMsgFromResponse(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getItems({
      dir,
      endDate,
      offset,
      searchTerm: router.query.search,
      size,
      sort,
      startDate,
    });
  }, [dir, endDate, offset, router.query.search, size, sort, startDate]);

  console.log(offset, "numberOfStockItems");
  useEffect(() => {
    if (stockitems?.length > 0) setIsDataBefore(true);
  }, [stockitems]);

  const onSubmitDelete = () => {
    dispatch(deleteStockitemRequest(selected));
  };

  const handleDetails = () => {
    dispatch(getStockitemRequest(selected));
    setDetailsModal(!detailsModal);
  };

  const data = stockitems?.map((notify: any) => {
    return {
      ...notify,
      id: notify?._id,
      title: notify?.stockitemData?.title,
      body: notify?.stockitemData?.body,
      imageUrl: (
        <Box color='blue.500'>
          <a
            href={notify?.stockitemData?.imageUrl}
            target='_blank'
            rel='noopener noreferrer'>
            {notify?.stockitemData?.imageUrl}
          </a>
        </Box>
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
      {/* <Box mt={4}>
        <Text as='b' p={"1"}>
          User Stockitems
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
      </Box> */}
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

  function checkURL(url) {
    return url?.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }
  return (
    <AdminAuth>
      <CDashboardLayout title='Stockitems' description='Stockitems' count={""}>
        <Flex p='10' flexWrap='wrap'>
          {data
            ?.filter((item) => checkURL(item?.picture))
            ?.map((item) => {
              return (
                <Button
                  shadow='xl'
                  bg='white'
                  _hover={{ bg: "white" }}
                  title={`${item?.entityData[0]?.name} item#${item?.nameLocalized?.mainLanguage}`}
                  key={item?._id}
                  w='200px'
                  h='200px'
                  mr='5'
                  mt='5'
                  position='relative'>
                  <Image
                    w='100%'
                    h='100%'
                    rounded='xl'
                    src={item?.picture}
                    alt={item?.nameLocalized?.mainLanguage}
                    objectFit='contain'
                  />
                </Button>
              );
            })}
        </Flex>
        {numberOfStockItems > stockitems?.length && (
          <Flex w='100%' justify='center' align='center' mb='20'>
            <Button
              isLoading={isLoading}
              bg='primary'
              _hover={{ bg: "primary" }}
              color='white'
              onClick={() => {
                console.log("ok", "numberOfStockItems");

                setPage(offset + 30);
              }}>
              Show More
            </Button>
          </Flex>
        )}
        {/* <CTable
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
          Title='Stockitems Management'
          subTitle={`Search stockitems.`}
          btnTitle=''
          placeHolder='Search for stockitems...'
          setPage={setPage}
          setPerPage={setPerPage}
          currentpage={pageNumber}
          setPageNumber={setPageNumber}
          perPage={size}
          totalPage={totalPage}
          searchFn={
            selectedUser ? getAllStockitemRequest : getAllStockitemRequest
          }
          idx={parseInt(router.query.idx)}
          headerChildren={() => <></>}
        /> */}
        {/* {parseInt(router.query.idx) <= 0 ||
      totalPage < parseInt(router.query.idx) ? (
        <Flex
          w='100%'
          h='80vh'
          align='center'
          justify='center'
          direction='column'>
          <Heading size='lg'>Stockitems</Heading>
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
            Back to Stockitems
          </Button>
        </Flex>
      ) : (
        <Box bg='#f4f6f9' minH='600px'>
          {data?.length === 0 && !isDataBefore && <StockitemsEmptyPage />}
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
              Title='Stockitems Management'
              subTitle={`Create, search, view and delete stockitems.`}
              btnTitle=''
              placeHolder='Search for stockitems...'
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
              searchFn={getAllStockitemRequest}
              idx={parseInt(router.query.idx)}
              headerChildren={() => (
                <>
                  <CreateButton
                    btnTitle='Create Stockitem'
                    onClick={() =>
                      dispatch(drawerActionToggle(true, "New", "stockitem"))
                    }
                  />
                </>
              )}
            />
          )}
        </Box>
      )} */}
        {/* <ActionsStockitems /> */}
        {/* <DeleteModel
          name={singleStockitem?.action}
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          onSubmit={onSubmitDelete}
        /> */}
        {/* <StockitemDetailsModal
          detailsModal={detailsModal}
          setDetailsModal={setDetailsModal}
          item={singleStockitem}
        /> */}
        {/* <UserStockitemsModal
        userStockitemsModal={userStockitemsModal}
        setUserStockitemsModal={setUserStockitemsModal}
        userStockitems={userStockitems}
      /> */}
      </CDashboardLayout>
    </AdminAuth>
  );
};

export default StockitemsPage;

StockitemsPage.getInitialProps = async (ctx: { query: any }) => {
  return { query: ctx.query };
};
