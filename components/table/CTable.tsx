import React, { useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Container,
  Box,
  Flex,
} from "@chakra-ui/react";

import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { TiArrowUnsorted } from "react-icons/ti";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import CFooter from "./CFooter";
import CHeader from "./CHeader";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const CTable = ({
  Data,
  Columns,
  Actions,
  Title,
  subTitle,
  btnTitle,
  placeHolder,
  actionsData,
  style,
  noSearchBar,
  noFilter,
  footerBtnTitle,
  filterList,
  selectedData,
  ActionsData,
  currentpage,
  setPerPage,
  setPage,
  perPage,
  totalPage,
  setPageNumber,
  archiveFn,
  filterLength,
  idx,
  filterType,
  headerChildren = () => <></>,
  searchFn = () => {},
  isLoading = false,
}) => {
  const dispatch = useDispatch();
  // const drawer = useSelector((state: RootState) => state.drawer);
  // const user = useSelector((state: RootState) => state.user);
  // const restaurantData = useSelector((state: RootState) => state.user.profile);
  // const email = user?.data?.email;
  // const firstName = restaurantData?.managerFirstName;
  // const lastName = restaurantData?.managerLastName;
  const router = useRouter();
  const data = useMemo(
    () =>
      Data?.map((value) => {
        return {
          ...value,
          Actions: ActionsData ? ActionsData(value) : Actions,
        };
      }),
    [Data]
  );

  const columns = useMemo(
    () =>
      Columns?.map((column) => {
        return {
          Header: column.Header,
          accessor: column.accessor,
        };
      }),
    [Columns]
  );

  const {
    state,
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      useControlledState: (state) => {
        return React?.useMemo(
          () => ({
            ...state,
            pageIndex: currentpage,
          }),
          [state, currentpage]
        );
      },
      initialState: { pageIndex: currentpage },
      manualPagination: true,
      pageCount: totalPage,
    },

    useGlobalFilter,

    useSortBy,
    usePagination
  );

  return (
    <Flex justifyContent={"center"} alignItems='center' p={8}>
      <Container maxW='container'>
        <Box mb={10}>
          <CHeader
            filterList={filterList}
            noSearchBar={noSearchBar}
            noFilter={noFilter}
            Title={Title}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            Data={Data}
            subTitle={subTitle}
            btnTitle={btnTitle}
            placeHolder={placeHolder}
            selectedData={selectedData}
            searchFn={searchFn}
            filterLength={filterLength}
            filterType={filterType}>
            {headerChildren()}
          </CHeader>
        </Box>
        <Table {...getTableProps()} bg='white' mb='6' borderRadius='6px'>
          <Thead bg='gray.50' color='#645f65'>
            {headerGroups?.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers?.map((column) => (
                  <Th
                    bg='gray.50'
                    {...column.getHeaderProps(
                      column.Header === "" ? "" : column.getSortByToggleProps()
                    )}>
                    <Flex>
                      {Data.length > 0 ||
                      router.pathname.includes("profile-management") ? (
                        <>
                          {column.render("Header")}
                          {column.Header === "" ? (
                            ""
                          ) : (
                            <chakra.span
                              style={{
                                paddingLeft: "10px",
                                margin: "-1px",
                              }}
                              display='inline-block'>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <TriangleDownIcon aria-label='sorted descending' />
                                ) : (
                                  <TriangleUpIcon aria-label='sorted ascending' />
                                )
                              ) : (
                                <TiArrowUnsorted fontSize='18px' />
                              )}
                            </chakra.span>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()} color='black'>
            {page?.map((row) => {
              prepareRow(row);

              return (
                <Tr
                  {...row.getRowProps()}
                  onClick={() => selectedData(row.original)}>
                  {row.cells?.map((cell) => (
                    <Td
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}>
                      {cell.render("Cell")}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <CFooter
          setPageNumber={setPageNumber}
          footerBtnTitle={footerBtnTitle}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          setPage={setPage}
          totalPage={totalPage}
          currentpage={currentpage}
          archiveFn={archiveFn}
          idx={idx}
          Data={Data}
        />
      </Container>
    </Flex>
  );
};

export default CTable;
