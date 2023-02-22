import {
  getAllCustomersReportsRequest,
  getAllSubscriptionsReportsRequest,
} from "@/modules/reports/Actions";
import { RootState } from "@/services/combinedReducers";
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Comparison = () => {
  const [filterDateOfCustomers, setFilterDateOfCustomers] = useState({
    firstDate: "",
    secondDate: "",
  });
  const [filterDateOfSubscriptions, setFilterDateOfSubscriptions] = useState({
    firstDate: "",
    secondDate: "",
    thirdDate: "",
    fourthDate: "",
  });
  const dispatch = useDispatch();

  const { customersList, subscriptions, isLoading, component } = useSelector(
    (state: RootState) => state.reports
  );

  useEffect(() => {
    if (filterDateOfCustomers.firstDate && filterDateOfCustomers.secondDate) {
      dispatch(
        getAllCustomersReportsRequest({
          filterByDateFrom: filterDateOfCustomers.firstDate,
          filterByDateTo: filterDateOfCustomers.secondDate,
        })
      );
    }
  }, [filterDateOfCustomers, dispatch]);

  useEffect(() => {
    if (
      filterDateOfSubscriptions.firstDate &&
      filterDateOfSubscriptions.secondDate &&
      filterDateOfSubscriptions.thirdDate &&
      filterDateOfSubscriptions.fourthDate
    ) {
      dispatch(
        getAllSubscriptionsReportsRequest({
          firstDate: filterDateOfSubscriptions.firstDate,
          secondDate: filterDateOfSubscriptions.secondDate,
          thirdDate: filterDateOfSubscriptions.thirdDate,
          fourthDate: filterDateOfSubscriptions.fourthDate,
        })
      );
    }
  }, [filterDateOfSubscriptions, dispatch]);

  console.log({ component });

  return (
    <Box mt={6} bg='#fff' p={8} borderRadius='md' boxShadow={"sm"}>
      <Heading size={"md"} mb={4}>
        Compare
      </Heading>
      <Flex>
        <Box borderRight={"2px solid rgba(0, 0, 0, .07)"} p={4} flex='.5'>
          <Heading size={"sm"} mb={4}>
            Customers
          </Heading>
          <Flex gridGap={2} flexDir='column'>
            <Box>
              <Flex gridGap={4}>
                <FormControl mb={3}>
                  <FormLabel>First Date</FormLabel>
                  <Input
                    type='text'
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    placeholder='Select Date'
                    value={filterDateOfCustomers.firstDate}
                    onChange={(e) => {
                      setFilterDateOfCustomers({
                        ...filterDateOfCustomers,
                        firstDate: e.target.value,
                      });
                    }}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel>Second Date</FormLabel>
                  <Input
                    type='text'
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    placeholder='Select Date'
                    value={filterDateOfCustomers.secondDate}
                    onChange={(e) => {
                      setFilterDateOfCustomers({
                        ...filterDateOfCustomers,
                        secondDate: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              </Flex>
            </Box>
            {isLoading && component === "cust" ? (
              <Box p={4} textAlign='center'>
                <Spinner size={"md"} />
              </Box>
            ) : customersList?.URL ? (
              <Text
                color='blue.500'
                cursor={"pointer"}
                bg='gray.50'
                p={4}
                borderRadius='sm'>
                <a onClick={() => window.open(customersList?.URL)}>
                  {customersList?.URL}
                </a>
              </Text>
            ) : !filterDateOfCustomers.firstDate ||
              !filterDateOfCustomers.secondDate ? null : (
              <Flex textAlign={"center"} justifyContent='center'>
                <Alert status='info' mt={4} borderRadius='md'>
                  <AlertIcon />
                  No data for this period
                </Alert>
              </Flex>
            )}
          </Flex>
        </Box>
        <Box p={4} flex='.5'>
          <Heading size={"sm"} mb={4}>
            Subscriptions
          </Heading>
          <Flex gridGap={2} flexDir='column'>
            <Box>
              <Flex gridGap={4}>
                <FormControl mb={3}>
                  <FormLabel>First Date</FormLabel>
                  <Input
                    type='text'
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    placeholder='Select Date'
                    value={filterDateOfSubscriptions.firstDate}
                    onChange={(e) => {
                      setFilterDateOfSubscriptions({
                        ...filterDateOfSubscriptions,
                        firstDate: e.target.value,
                      });
                    }}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel>Second Date</FormLabel>
                  <Input
                    type='text'
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    placeholder='Select Date'
                    value={filterDateOfSubscriptions.secondDate}
                    onChange={(e) => {
                      setFilterDateOfSubscriptions({
                        ...filterDateOfSubscriptions,
                        secondDate: e.target.value,
                      });
                    }}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel>Third Date</FormLabel>
                  <Input
                    type='text'
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    placeholder='Select Date'
                    value={filterDateOfSubscriptions.thirdDate}
                    onChange={(e) => {
                      setFilterDateOfSubscriptions({
                        ...filterDateOfSubscriptions,
                        thirdDate: e.target.value,
                      });
                    }}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel>Fourth Date</FormLabel>
                  <Input
                    type='text'
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    placeholder='Select Date'
                    value={filterDateOfSubscriptions.fourthDate}
                    onChange={(e) => {
                      setFilterDateOfSubscriptions({
                        ...filterDateOfSubscriptions,
                        fourthDate: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              </Flex>
            </Box>
            {isLoading && component === "subs" ? (
              <Box p={4} textAlign='center'>
                <Spinner size={"md"} />
              </Box>
            ) : subscriptions?.URL ? (
              <Text
                color='blue.500'
                cursor={"pointer"}
                bg='gray.50'
                p={4}
                borderRadius='sm'>
                <a onClick={() => window.open(customersList?.URL)}>
                  {customersList?.URL}
                </a>
              </Text>
            ) : !filterDateOfSubscriptions.firstDate ||
              !filterDateOfSubscriptions.secondDate ||
              !filterDateOfSubscriptions.thirdDate ||
              !filterDateOfSubscriptions.fourthDate ? null : (
              <Flex textAlign={"center"} justifyContent='center'>
                <Alert status='info' mt={4} borderRadius='md'>
                  <AlertIcon />
                  No data for this period
                </Alert>
              </Flex>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Comparison;
