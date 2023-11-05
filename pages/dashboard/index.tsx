import AdminAuth from "@/components/auth/AdminAuth";
import Comparison from "@/components/dashboard/Comparison";
import DCustomersList from "@/components/drawers/reports/DCustomersList";
import DSubscriptipons from "@/components/drawers/reports/DSubscriptipons";
import DSystemLogs from "@/components/drawers/reports/DSystemLogs";
import CDashboardLayout from "@/components/layout/dashboardLayout/CDashboardLayout";
import { extractErrorMsgFromResponse } from "@/utils/apiHelpers";
import { lineChartProps } from "@/utils/charts";
import {
  Box,
  Button,
  Flex,
  Text,
  Icon,
  Stack,
  Heading,
  Select,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-date-range";
import { BiStoreAlt } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";

const currentYear = new Date()?.getFullYear();

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const Dashboard = () => {
  // lineRevenueChartProps(labels);

  const [monthRevenue, setMonthRevenue] = useState<any>([]);
  const [revenueYear, setRevenueYear] = useState<number>(currentYear);

  // Subscription Chart
  const [monthSubscription, setMonthSubscription] = useState<any>([]);
  const [subscriptionYear, setSubscriptionYear] = useState<number>(currentYear);

  // Resturants Chart
  const [monthResturants, setMonthResturants] = useState<any>([]);
  const [restaurantYear, setRestaurantYear] = useState<number>(currentYear);

  // Stores Chart
  const [monthStores, setMonthStores] = useState<any>([]);
  const [storeYear, setStoreYear] = useState<number>(currentYear);

  // Customers Chart
  const [monthCustomers, setMonthCustomers] = useState<any>([]);
  const [customerYear, setCustomerYear] = useState<number>(currentYear);

  const [statYear, setStatYear] = useState<number>(currentYear);
  const [statsNumber, setStatsNumber] = useState({});

  useEffect(() => {
    let timeId = setTimeout(() => {
      getBaseStats();
    }, 200);
    return () => clearTimeout(timeId);
  }, [statYear]);
  useEffect(() => {
    getMonthRevenuesStats();
  }, [revenueYear]);
  useEffect(() => {
    getMonthSubscriptionsStats();
  }, [subscriptionYear]);
  useEffect(() => {
    getMonthResturantsStats();
  }, [restaurantYear]);
  useEffect(() => {
    getMonthStoresStats();
  }, [storeYear]);
  useEffect(() => {
    getMonthCustomersStats();
  }, [customerYear]);

  const getBaseStats = async () => {
    let theFirst = new Date(statYear, 0, 1);
    let theLast = new Date(statYear, 11, 31);
    try {
      const { data } = await axios.post("/report/me/statistics-report", {
        filterByDateFrom: theFirst,
        filterByDateTo: theLast,
      });
      setStatsNumber(data);
    } catch (error) {
      extractErrorMsgFromResponse(error);
    }
  };
  const getMonthRevenuesStats = async () => {
    try {
      const { data: monthlyData } = await axios.post(
        "/report/me/monthly-revenues",
        { currentYear: revenueYear }
      );

      const months = [];
      for (let i = 1; i < 13; i++) {
        const data = monthlyData?.find((d) => d?.month == i);
        if (data) {
          months.push(data);
        } else {
          months.push({
            totalPrice: 0,
            entitiesCount: 0,
            month: i,
          });
        }
      }

      const revenues = months?.map((month) => month.totalPrice);
      setMonthRevenue(revenues);
    } catch (error) {
      extractErrorMsgFromResponse(error);
    }
  };
  const getMonthSubscriptionsStats = async () => {
    try {
      const { data: monthlyData } = await axios.post(
        "/report/me/monthly-revenues",
        { currentYear: subscriptionYear }
      );

      const months = [];
      for (let i = 1; i < 13; i++) {
        const data = monthlyData?.find((d) => d?.month == i);
        if (data) {
          months.push(data);
        } else {
          months.push({
            totalPrice: 0,
            entitiesCount: 0,
            month: i,
          });
        }
      }

      const subsctiptions = months?.map((month) => month.entitiesCount);

      setMonthSubscription(subsctiptions);
    } catch (error) {
      extractErrorMsgFromResponse(error);
    }
  };
  const getMonthResturantsStats = async () => {
    try {
      const { data: monthlyData } = await axios.post(
        "/report/me/monthly-created-restaurants",
        { currentYear: restaurantYear }
      );

      const months = [];
      for (let i = 1; i < 13; i++) {
        const data = monthlyData?.find((d) => d?.month == i);
        if (data) {
          months.push(data);
        } else {
          months.push({
            restaurantCount: 0,
            month: i,
          });
        }
      }

      const resturants = months?.map((month) => month.restaurantCount);

      setMonthResturants(resturants);
    } catch (error) {
      extractErrorMsgFromResponse(error);
    }
  };
  const getMonthStoresStats = async () => {
    try {
      const { data: monthlyData } = await axios.post(
        "/report/me/monthly-created-stores",
        { currentYear: storeYear }
      );

      const months = [];
      for (let i = 1; i < 13; i++) {
        const data = monthlyData?.find((d) => d?.month == i);
        if (data) {
          months.push(data);
        } else {
          months.push({
            storeCount: 0,
            month: i,
          });
        }
      }

      const stores = months?.map((month) => month.storeCount);

      setMonthStores(stores);
    } catch (error) {
      extractErrorMsgFromResponse(error);
    }
  };
  const getMonthCustomersStats = async () => {
    try {
      const { data: monthlyData } = await axios.post(
        "/report/me/monthly-created-customers",
        { currentYear: customerYear }
      );

      const months = [];
      for (let i = 1; i < 13; i++) {
        const data = monthlyData?.find((d) => d?.month == i);
        if (data) {
          months.push(data);
        } else {
          months.push({
            customersCount: 0,
            month: i,
          });
        }
      }

      const customers = months?.map((month) => month.customersCount);

      setMonthCustomers(customers);
    } catch (error) {
      extractErrorMsgFromResponse(error);
    }
  };

  console.log(monthRevenue, monthSubscription, statsNumber, "statsNumber");
  if (typeof window == "undefined") return null;
  return (
    <AdminAuth>
      <CDashboardLayout title={"Dashboard"} description='Dashboard' count={""}>
        <Box px={"100px"} py={"50px"}>
          <Flex justify='space-between' mb='10'>
            <Heading size='lg' fontWeight='medium'>
              Statistics
            </Heading>
            <CYearsSelect year={statYear} setYear={setStatYear} />
          </Flex>
          <Flex
            justifyContent={"space-between"}
            alignItems='center'
            gridGap={5}
            flexDir={{
              sm: "column",
              md: "column",
              xl: "column",
              "2xl": "row",
            }}>
            <CNumberStats
              name={"Restaurants"}
              icon={IoStorefrontOutline}
              stat={statsNumber?.Restaurants}
            />{" "}
            <CNumberStats
              name={"Stores"}
              icon={BiStoreAlt}
              stat={statsNumber?.Stores}
            />
            <CNumberStats
              name={"Reveneue"}
              icon={MdOutlineAttachMoney}
              stat={statsNumber?.Revenue}
            />
            <CNumberStats
              name={"Customer"}
              icon={BsPeople}
              stat={statsNumber?.Customers}
            />
          </Flex>
          <Grid templateColumns='repeat(2, 1fr)' gap={6}>
            <GridItem>
              {/* Month Revenue */}
              <CLineChart
                data={monthRevenue}
                year={revenueYear}
                setYear={setRevenueYear}
                symbol='$'
                title='Revenues'
              />{" "}
            </GridItem>
            <GridItem>
              {/* Month Subscription */}
              <CLineChart
                data={monthSubscription}
                year={subscriptionYear}
                setYear={setSubscriptionYear}
                symbol=''
                title='Subscriptions'
              />
            </GridItem>
            <GridItem>
              {/* Month Stores */}
              <CLineChart
                data={monthStores}
                year={storeYear}
                setYear={setStoreYear}
                symbol=''
                title='Stores'
              />
            </GridItem>
            <GridItem>
              {/* Month Resturants */}
              <CLineChart
                data={monthResturants}
                year={restaurantYear}
                setYear={setRestaurantYear}
                symbol=''
                title='Restaurants'
              />{" "}
            </GridItem>
            <GridItem colSpan={2}>
              {/* Month Customers */}
              <CLineChart
                data={monthCustomers}
                year={customerYear}
                setYear={setCustomerYear}
                symbol=''
                title='Customers'
              />{" "}
            </GridItem>
          </Grid>
        </Box>
      </CDashboardLayout>
    </AdminAuth>
  );
};

const CLineChart = ({ data, year, setYear, symbol, title }: any) => {
  const properties = lineChartProps(labels, data, symbol);

  return (
    <Stack mt='10'>
      <Flex justify='space-between'>
        <Heading size='lg' fontWeight='medium'>
          {title}
        </Heading>
        <CYearsSelect year={year} setYear={setYear} />
      </Flex>

      <Box h='100%' w='100%' bg='#fff' mt={6}>
        {typeof window !== "undefined" && (
          <Chart
            options={properties.options}
            series={properties.series}
            type='line'
            height={414}
            width={"100%"}
          />
        )}
      </Box>
    </Stack>
  );
};
const CNumberStats = ({ stat, icon, name }: any) => {
  return (
    <Box
      bg='#fff'
      borderRadius={"md"}
      width='100%'
      height={"100%"}
      padding='20px'>
      <Flex gridGap={4} alignItems='center'>
        <Box border={"1px solid rgba(0, 0, 0, .07)"} p={4} borderRadius='50%'>
          <Icon as={icon} color='primary' w='8' h='8' />
        </Box>
        <Flex flexDir={"column"} gridGap={2}>
          <Text fontWeight={"bold"} fontSize='larger'>
            {stat}
          </Text>
          <Text color={"gray.500"}>{name}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

const CYearsSelect = ({ year, setYear }: any) => {
  const startYear = 2022;
  let yearsData = [];
  for (let year = startYear; year <= currentYear; year++) {
    yearsData.push(year);
  }
  return (
    <Select
      bg='white'
      w='200px'
      placeholder='Select Years'
      value={year}
      onChange={(e) => {
        console.log(e.target.value, "value");
        setYear(parseInt(e.target.value));
      }}>
      {yearsData?.map((date) => {
        return (
          <option value={date} key={date}>
            {date}
          </option>
        );
      })}
    </Select>
  );
};

export default Dashboard;
