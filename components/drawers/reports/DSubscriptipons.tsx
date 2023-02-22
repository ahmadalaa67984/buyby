import DateRange from "@/components/core/dateRange";
import { getAllSubscriptionsReportsRequest } from "@/modules/reports/Actions";
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

const DSubscriptipons: React.FC<{
  showSubscriptions: boolean;
  setShowSubscriptions: Dispatch<SetStateAction<any>>;
}> = ({ showSubscriptions, setShowSubscriptions }) => {
  const [filterDate, setFilterDate] = useState({
    firstDate: "",
    secondDate: "",
    thirdDate: "",
    fourthDate: "",
  });
  const dispatch = useDispatch();

  const { subscriptions, isLoading } = useSelector(
    (state: RootState) => state.reports
  );

  useEffect(() => {
    if (showSubscriptions) {
      dispatch(
        getAllSubscriptionsReportsRequest({
          firstDate: moment(new Date()).subtract(1, "month").add(1, "day"),
          secondDate: moment(new Date()).subtract(1, "month").add(1, "day"),
          thirdDate: moment(new Date()).subtract(1, "month").add(1, "day"),
          fourthDate: moment(new Date()).subtract(1, "month").add(1, "day"),
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (
      filterDate.firstDate &&
      filterDate.secondDate &&
      filterDate.thirdDate &&
      filterDate.fourthDate
    ) {
      dispatch(
        getAllSubscriptionsReportsRequest({
          firstDate: filterDate.firstDate,
          secondDate: filterDate.secondDate,
          thirdDate: filterDate.thirdDate,
          fourthDate: filterDate.fourthDate,
        })
      );
    }
  }, [filterDate, dispatch]);

  return (
    <Modal
      onClose={() => setShowSubscriptions((prev: boolean) => !prev)}
      size='full'
      isOpen={showSubscriptions}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Subscriptions Reports</ModalHeader>
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
                    <FormControl mb={3}>
                      <FormLabel>Third Date</FormLabel>
                      <Input
                        type='date'
                        value={filterDate.thirdDate}
                        onChange={(e) => {
                          setFilterDate({
                            ...filterDate,
                            thirdDate: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                    <FormControl mb={3}>
                      <FormLabel>Fourth Date</FormLabel>
                      <Input
                        type='date'
                        value={filterDate.fourthDate}
                        onChange={(e) => {
                          setFilterDate({
                            ...filterDate,
                            fourthDate: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
          {subscriptions?.URL ? (
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
                      <a onClick={() => window.open(subscriptions?.URL)}>
                        {subscriptions?.URL}
                      </a>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <Alert status='info' mt={6} borderRadius='md'>
              <AlertIcon />
              No data found
            </Alert>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => setShowSubscriptions((prev: boolean) => !prev)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DSubscriptipons;
