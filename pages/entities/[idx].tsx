import CDashboardLayout from "@/components/layout/dashboardLayout/CDashboardLayout";
import CTable from "@/components/table/CTable";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
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
  deleteEntityRequest,
  getAllEntityRequest,
  getEntityRequest,
} from "@/modules/entities/Actions";
import { drawerActionToggle } from "@/modules/drawer/Actions";
import CreateButton from "@/components/core/buttons/CreateButton";
import axios from "axios";
import AdminAuth from "@/components/auth/AdminAuth";

const EntitiesPage = (props) => {
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
  const [userEntitiesModal, setUserEntitiesModal] = useState(false);
  const [sort, setSort] = useState("updatedAt");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selected, setSelected] = useState<any>();
  // Check if the tables have data before search
  const [isDataBefore, setIsDataBefore] = useState<boolean>(false);
  const viewData = (data) => {
    setSelected(data);
  };

  const { entities, isLoading, singleEntity, numberOfEntities } = useSelector(
    (state: RootState) => state.entities
  );

  useEffect(() => {
    dispatch(
      getAllEntityRequest({
        offset: (parseInt(router.query.idx) - 1) * 10,
        size,
        searchTerm: router.query.search,
        dir,
        sort,
        filterByDateFrom: startDate,
        filterByDateTo: endDate,
      })
    );
  }, [
    dir,
    dispatch,
    endDate,
    router.query.idx,
    router.query.search,
    size,
    sort,
    startDate,
  ]);

  useEffect(() => {
    if (entities?.length > 0) setIsDataBefore(true);
  }, [entities]);

  const onSubmitDelete = () => {
    dispatch(deleteEntityRequest(selected));
  };

  const handleDetails = () => {
    dispatch(getEntityRequest(selected));
    setDetailsModal(!detailsModal);
  };

  const data = entities?.map((entity: any) => {
    return {
      ...entity,
      name: entity?.name,
      phoneNumber: entity?.phoneNumber,
      type: entity?.entityType == "STORE" ? "Store" : "Merchant",
      updateDate: new Date(entity?.updatedAt)?.toLocaleDateString(),
      image: (
        <Image
          src={entity?.logo}
          alt={entity?.name}
          w='55px'
          h='55px'
          rounded='xl'
          objectFit='cover'
        />
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
          User Entities
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
      Header: "Image",
      accessor: "image",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Phone",
      accessor: "phoneNumber",
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "SKU",
      accessor: "sku",
    },
    {
      Header: "Update Date",
      accessor: "updateDate",
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
              onClick={() =>
                router?.push(`/stockitems/1?idx=1&entity=${data?._id}`)
              }>
              Show Items
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    );
  };

  console.log({ selected });
  console.log({ props, numberOfEntities });

  const totalPage = Math.ceil(numberOfEntities / 10)
    ? Math.ceil(numberOfEntities / 10)
    : 1;

  return (
    <AdminAuth>
      <CDashboardLayout title='Entities' description='Entities' count={""}>
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
          Title='Entities Management'
          subTitle={` search entities.`}
          btnTitle=''
          placeHolder='Search for entities...'
          setPage={setPage}
          setPerPage={setPerPage}
          currentpage={pageNumber}
          setPageNumber={setPageNumber}
          perPage={size}
          totalPage={totalPage}
          searchFn={selectedUser ? getAllEntityRequest : getAllEntityRequest}
          idx={parseInt(router.query.idx)}
          headerChildren={() => (
            <>
              {/* <CreateButton
                btnTitle='Create Entity'
                onClick={() =>
                  dispatch(drawerActionToggle(true, "New", "entity"))
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
          <Heading size='lg'>Entities</Heading>
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
            Back to Entities
          </Button>
        </Flex>
      ) : (
        <Box bg='#f4f6f9' minH='600px'>
          {data?.length === 0 && !isDataBefore && <EntitiesEmptyPage />}
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
              Title='Entities Management'
              subTitle={`Create, search, view and delete entities.`}
              btnTitle=''
              placeHolder='Search for entities...'
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
              searchFn={getAllEntityRequest}
              idx={parseInt(router.query.idx)}
              headerChildren={() => (
                <>
                  <CreateButton
                    btnTitle='Create Entity'
                    onClick={() =>
                      dispatch(drawerActionToggle(true, "New", "entity"))
                    }
                  />
                </>
              )}
            />
          )}
        </Box>
      )} */}
        {/* <ActionsEntities /> */}
        {/* <DeleteModel
          name={singleEntity?.action}
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          onSubmit={onSubmitDelete}
        /> */}
        {/* <EntityDetailsModal
          detailsModal={detailsModal}
          setDetailsModal={setDetailsModal}
          item={singleEntity}
        /> */}
        {/* <UserEntitiesModal
        userEntitiesModal={userEntitiesModal}
        setUserEntitiesModal={setUserEntitiesModal}
        userEntities={userEntities}
      /> */}
      </CDashboardLayout>
    </AdminAuth>
  );
};

export default EntitiesPage;

EntitiesPage.getInitialProps = async (ctx: { query: any }) => {
  return { query: ctx.query };
};
