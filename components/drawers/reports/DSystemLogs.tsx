import DateRange from "@/components/core/dateRange";
import { getAllLogsReportsRequest } from "@/modules/reports/Actions";
import { RootState } from "@/services/combinedReducers";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import moment from "moment";
import React, { SetStateAction, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

const DSystemLogs: React.FC<{
  showSystemLogs: boolean;
  setShowSystemLogs: Dispatch<SetStateAction<any>>;
}> = ({ showSystemLogs, setShowSystemLogs }) => {
  const [isDateRangeVisible, setIsDateRangeVisible] = useState<boolean>(false);
  const [filterPeriod, setFilterPeriod] = useState({
    date: "",
    period: "",
  });
  const [dailyChart, setDailyChart] = useState({
    date: "",
    period: "",
  });
  const dispatch = useDispatch();
  const [stateOfDate, setStateOfDate] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const { logsReports, isLoading } = useSelector(
    (state: RootState) => state.reports
  );

  useEffect(() => {
    if (showSystemLogs) {
      dispatch(
        getAllLogsReportsRequest({
          filterByDateFrom: moment(new Date())
            .subtract(1, "month")
            .add(1, "day"),
          filterByDateTo: moment(new Date()).format(),
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (stateOfDate[0].startDate && stateOfDate[0].endDate) {
      dispatch(
        getAllLogsReportsRequest({
          filterByDateFrom: moment(stateOfDate[0].startDate).format(),
          filterByDateTo: moment(stateOfDate[0].endDate).format(),
        })
      );
    }
  }, [stateOfDate, dispatch]);

  useEffect(() => {
    if (filterPeriod.date && filterPeriod.period) {
      dispatch(
        getAllLogsReportsRequest({
          filterPeriod: {
            date: filterPeriod.date,
            period: filterPeriod.period,
          },
        })
      );
    }
  }, [filterPeriod, dispatch]);

  useEffect(() => {
    if (dailyChart.date && dailyChart.period) {
      dispatch(
        getAllLogsReportsRequest({
          dailyChart: {
            date: dailyChart.date,
            period: dailyChart.period,
          },
        })
      );
    }
  }, [dailyChart, dispatch]);

  return (
    <Modal
      onClose={() => setShowSystemLogs((prev: boolean) => !prev)}
      size='full'
      isOpen={showSystemLogs}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>System Logs Reports</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gridGap={4} alignItems='center'>
            <Box>
              {isDateRangeVisible && (
                <Box
                  position={"absolute"}
                  maxH='500px'
                  zIndex={999}
                  top='11.5%'
                  boxShadow={"md"}>
                  <DateRange
                    stateOfDate={stateOfDate}
                    setStateOfDate={setStateOfDate}
                  />
                </Box>
              )}
              <Box zIndex={1000}>
                <Button
                  colorScheme={"primaryColorScheme"}
                  onClick={() => setIsDateRangeVisible((prev) => !prev)}>
                  Choose Date Range
                </Button>
              </Box>
            </Box>
            <Box>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  height='43px'>
                  Filter Period
                </MenuButton>
                <MenuList p={4}>
                  <MenuOptionGroup>
                    <Input
                      type='date'
                      mb={3}
                      value={filterPeriod.date}
                      onChange={(e) => {
                        setFilterPeriod({
                          ...filterPeriod,
                          date: e.target.value,
                        });
                      }}
                    />
                  </MenuOptionGroup>
                  <MenuOptionGroup mt={4}>
                    <Select
                      value={filterPeriod.period}
                      onChange={(e) =>
                        setFilterPeriod({
                          ...filterPeriod,
                          period: e.target.value,
                        })
                      }>
                      <option value=''>Select Option</option>
                      <option value='TODAY'>Today</option>
                      <option value='YESTERDAY'>Yesterday</option>
                      <option value='WTD'>Week to Day</option>
                      <option value='LASTWEEK'>Last Week</option>
                      <option value='LASTMONTH'>Last Month</option>
                      <option value='MTD'>Month to Day</option>
                      <option value='YTD'>Year to Day</option>
                    </Select>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Box>
            <Box>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  height='43px'>
                  Daily Chart
                </MenuButton>
                <MenuList p={3}>
                  <MenuOptionGroup>
                    <Input
                      type='date'
                      mb={3}
                      value={dailyChart.date}
                      onChange={(e) => {
                        setDailyChart({
                          ...dailyChart,
                          date: e.target.value,
                        });
                      }}
                    />
                  </MenuOptionGroup>
                  <MenuOptionGroup mt={4}>
                    <Select
                      value={dailyChart.period}
                      onChange={(e) => {
                        setDailyChart({
                          ...dailyChart,
                          period: e.target.value,
                        });
                      }}>
                      <option value=''>Select Option</option>
                      <option value='MTD'>Month to Day</option>
                      <option value='LASTMONTH'>Last Month</option>
                      <option value='CUSTOMMONTH'>Custom Month</option>
                    </Select>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
          {isLoading ? (
            <Box p={8} textAlign='center'>
              <Spinner size={"md"} />
            </Box>
          ) : logsReports?.URL ? (
            <TableContainer mt={"50px"}>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>CSV File</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td color='blue.500' cursor={"pointer"}>
                      <a onClick={() => window.open(logsReports?.URL)}>
                        {logsReports?.URL}
                      </a>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <Flex textAlign={"center"} justifyContent='center'>
              <Alert status='info' mt={6} borderRadius='md' maxW={"200px"}>
                <AlertIcon />
                No data found
              </Alert>
            </Flex>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setShowSystemLogs((prev: boolean) => !prev)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DSystemLogs;
