import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/combinedReducers";
import {
  activateUserRequest,
  getAllSuperAdminsRequest,
} from "@/modules/super-admin/Actions";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import CDashboardLayout from "@/components/layout/dashboardLayout/CDashboardLayout";
import CTable from "@/components/table/CTable";
import CreateButton from "@/components/core/buttons/CreateButton";
import { drawerActionToggle } from "@/modules/drawer/Actions";
import SuperAdminEmptyPage from "@/components/tablesData/super-admin/SuperAdminsEmptyPage";
import ActionsSuperAdmin from "@/components/drawers/admins/ActionsSuperAdmin";
import { ISuperAdmin } from "@/modules/super-admin/interface";
import AdminAuth from "@/components/auth/AdminAuth";

const SuperAdminsPage = (props) => {
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
  // Check if the tables have data before search
  const [isDataBefore, setIsDataBefore] = useState<boolean>(false);
  const viewData = (data) => {
    setSelected(data);
  };

  const { superAdmins, isLoading, numberOfSuperAdmins } = useSelector(
    (state: RootState) => state.superAdmins
  );

  useEffect(() => {
    dispatch(
      getAllSuperAdminsRequest({
        offset: (parseInt(props.query.idx) - 1) * 10,
        size,
        searchTerm: router.query.search,
      })
    );
  }, [props.query, dispatch, router.query.search, size]);

  useEffect(() => {
    if (superAdmins?.length > 0) setIsDataBefore(true);
  }, [superAdmins]);

  useEffect(() => {
    dispatch(
      getAllSuperAdminsRequest({
        dir,
        sort,
        filterByDateFrom: startDate,
        filterByDateTo: endDate,
      })
    );
  }, [dir, sort, startDate, endDate, dispatch]);

  const data = superAdmins?.map((admin: ISuperAdmin) => {
    return {
      ...admin,
      id: admin?._id,
      //   name: admin?.name,
      email: admin?.email,
      phone: admin?.phoneNumber,
      actions: (
        <FormControl display='flex' gridGap={4} alignItems='center' mt={4}>
          <Switch
            defaultChecked={admin?.active}
            onChange={(e) =>
              dispatch(
                activateUserRequest({
                  active: e.target.checked,
                  _id: admin?._id,
                })
              )
            }
          />
          <FormLabel>{admin?.active ? "Active" : "Inactive"}</FormLabel>
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
    // {
    //   Header: "Name",
    //   accessor: "name",
    // },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
    },
    {
      Header: "Activation",
      accessor: "actions",
    },
  ];

  const totalPage = Math.ceil(numberOfSuperAdmins / 10)
    ? Math.ceil(numberOfSuperAdmins / 10)
    : 1;
  console.log({ superAdmins, numberOfSuperAdmins });

  return (
    <AdminAuth>
      <CDashboardLayout
        title='Super Admins'
        description='Super Admins'
        count={""}>
        {parseInt(props.query.idx) <= 0 ||
        totalPage < parseInt(props.query.idx) ? (
          <Flex
            w='100%'
            h='80vh'
            align='center'
            justify='center'
            direction='column'>
            <Heading size='lg'>Super Admins</Heading>
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
              Back to Super Admins
            </Button>
          </Flex>
        ) : (
          <Box bg='#f4f6f9' minH='600px'>
            {data?.length === 0 && !isDataBefore && <SuperAdminEmptyPage />}
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
                Title='Admins Management'
                subTitle={`Search and view super admins.`}
                btnTitle=''
                placeHolder='Search for super admins...'
                setPage={setPage}
                setPerPage={setPerPage}
                currentpage={pageNumber}
                setPageNumber={setPageNumber}
                perPage={size}
                totalPage={totalPage}
                searchFn={getAllSuperAdminsRequest}
                idx={parseInt(props.query.idx)}
                headerChildren={() => (
                  <>
                    <CreateButton
                      btnTitle='Create Admin'
                      onClick={() =>
                        dispatch(drawerActionToggle(true, "New", "super-admin"))
                      }
                    />
                  </>
                )}
              />
            )}
          </Box>
        )}
        <ActionsSuperAdmin />
      </CDashboardLayout>
    </AdminAuth>
  );
};

export default SuperAdminsPage;

SuperAdminsPage.getInitialProps = async (ctx: { query: any }) => {
  return { query: ctx.query };
};
