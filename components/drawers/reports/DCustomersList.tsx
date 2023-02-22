import DateRange from "@/components/core/dateRange";
import {
  getAllCustomersReportsRequest,
  getAllSubscriptionsReportsRequest,
} from "@/modules/reports/Actions";
import { RootState } from "@/services/combinedReducers";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
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

const DCustomersList: React.FC<{
  showCustomersList: boolean;
  setShowCustomersList: Dispatch<SetStateAction<any>>;
}> = ({ showCustomersList, setShowCustomersList }) => {
  const [filterDate, setFilterDate] = useState({
    firstDate: "",
    secondDate: "",
  });
  const dispatch = useDispatch();

  const { customersList, isLoading } = useSelector(
    (state: RootState) => state.reports
  );

  useEffect(() => {
    if (showCustomersList) {
      dispatch(
        getAllCustomersReportsRequest({
          filterByDateFrom: moment(new Date())
            .subtract(1, "month")
            .add(1, "day"),
          filterByDateTo: moment(new Date()).subtract(1, "month").add(1, "day"),
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (filterDate.firstDate && filterDate.secondDate) {
      dispatch(
        getAllCustomersReportsRequest({
          filterByDateFrom: filterDate.firstDate,
          filterByDateTo: filterDate.secondDate,
        })
      );
    }
  }, [filterDate, dispatch]);

  return (
    <Modal
      onClose={() => setShowCustomersList((prev: boolean) => !prev)}
      size='full'
      isOpen={showCustomersList}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Customers Reports</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gridGap={4} alignItems='center'>
            <Box>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  height='43px'>
                  Filter Dates
                </MenuButton>
                <MenuList p={4}>
                  <MenuOptionGroup>
                    <FormControl mb={3}>
                      <FormLabel>First Date</FormLabel>
                      <Input
                        type='date'
                        value={filterDate.firstDate}
                        onChange={(e) => {
                          setFilterDate({
                            ...filterDate,
                            firstDate: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                    <FormControl mb={3}>
                      <FormLabel>Second Date</FormLabel>
                      <Input
                        type='date'
                        value={filterDate.secondDate}
                        onChange={(e) => {
                          setFilterDate({
                            ...filterDate,
                            secondDate: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
          {isLoading ? (
            <Box p={8} textAlign='center'>
              <Spinner size={"md"} />
            </Box>
          ) : customersList?.URL ? (
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
                      <a onClick={() => window.open(customersList?.URL)}>
                        {customersList?.URL}
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
          <Button
            onClick={() => setShowCustomersList((prev: boolean) => !prev)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DCustomersList;
