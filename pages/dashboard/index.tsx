import AdminAuth from "@/components/auth/AdminAuth";
import CDashboardLayout from "@/components/layout/dashboardLayout/CDashboardLayout";
import { lineChartProps } from "@/utils/charts";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";

const Dashboard = () => {
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

  const [properties, setProperties] = useState<any>(lineChartProps(labels));

  return (
    <AdminAuth>
      <CDashboardLayout title={"Dashboard"} description='Dashboard' count={""}>
        <Box px={"100px"} py={"50px"}>
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
            <Box
              bg='#fff'
              borderRadius={"md"}
              width='100%'
              height={"100%"}
              padding='20px'>
              <Flex gridGap={4} alignItems='center'>
                <Box
                  border={"1px solid rgba(0, 0, 0, .07)"}
                  p={4}
                  borderRadius='50%'>
                  <Image
                    src='/images/coffee.png'
                    width={30}
                    height={30}
                    alt='coffe'
                  />
                </Box>
                <Flex flexDir={"column"} gridGap={2}>
                  <Text fontWeight={"bold"} fontSize='larger'>
                    80
                  </Text>
                  <Text color={"gray.500"}>Total Restaurants</Text>
                  <Flex gridGap={3}>
                    <Image
                      src='/images/trending-up.png'
                      width={18}
                      height={18}
                      alt='arrow'
                    />
                    <Text color='gray.400'>4% (30 days)</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
            <Box
              bg='#fff'
              borderRadius={"md"}
              width='100%'
              height={"100%"}
              padding='20px'>
              <Flex gridGap={4} alignItems='center'>
                <Box
                  border={"1px solid rgba(0, 0, 0, .07)"}
                  p={4}
                  borderRadius='50%'>
                  <Image
                    src='/images/coffee.png'
                    width={30}
                    height={30}
                    alt='coffe'
                  />
                </Box>
                <Flex flexDir={"column"} gridGap={2}>
                  <Text fontWeight={"bold"} fontSize='larger'>
                    40
                  </Text>
                  <Text color={"gray.500"}>Total Stores</Text>
                  <Flex gridGap={3}>
                    <Image
                      src='/images/trending-up.png'
                      width={18}
                      height={18}
                      alt='arrow'
                    />
                    <Text color='gray.400'>4% (30 days)</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
            <Box
              bg='#fff'
              borderRadius={"md"}
              width='100%'
              height={"100%"}
              padding='20px'>
              <Flex gridGap={4} alignItems='center'>
                <Box
                  border={"1px solid rgba(0, 0, 0, .07)"}
                  p={4}
                  borderRadius='50%'>
                  <Image
                    src='/images/coffee.png'
                    width={30}
                    height={30}
                    alt='coffe'
                  />
                </Box>
                <Flex flexDir={"column"} gridGap={2}>
                  <Text fontWeight={"bold"} fontSize='larger'>
                    85K
                  </Text>
                  <Text color={"gray.500"}>Reveneue</Text>
                  <Flex gridGap={3}>
                    <Image
                      src='/images/trending-up.png'
                      width={18}
                      height={18}
                      alt='arrow'
                    />
                    <Text color='gray.400'>4% (30 days)</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
            <Box
              bg='#fff'
              borderRadius={"md"}
              width='100%'
              height={"100%"}
              padding='20px'>
              <Flex gridGap={4} alignItems='center'>
                <Box
                  border={"1px solid rgba(0, 0, 0, .07)"}
                  p={4}
                  borderRadius='50%'>
                  <Image
                    src='/images/coffee.png'
                    width={30}
                    height={30}
                    alt='coffe'
                  />
                </Box>
                <Flex flexDir={"column"} gridGap={2}>
                  <Text fontWeight={"bold"} fontSize='larger'>
                    50K
                  </Text>
                  <Text color={"gray.500"}>Customer</Text>
                  <Flex gridGap={3}>
                    <Image
                      src='/images/trending-up.png'
                      width={18}
                      height={18}
                      alt='arrow'
                    />
                    <Text color='gray.400'>4% (30 days)</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
            <Box
              bg='#fff'
              borderRadius={"md"}
              width='100%'
              height={"100%"}
              padding='20px'>
              <Flex gridGap={4} alignItems='center'>
                <Box
                  border={"1px solid rgba(0, 0, 0, .07)"}
                  p={4}
                  borderRadius='50%'>
                  <Image
                    src='/images/coffee.png'
                    width={30}
                    height={30}
                    alt='coffe'
                  />
                </Box>
                <Flex flexDir={"column"} gridGap={2}>
                  <Text fontWeight={"bold"} fontSize='larger'>
                    80
                  </Text>
                  <Text color={"gray.500"}>Total Restaurants</Text>
                  <Flex gridGap={3}>
                    <Image
                      src='/images/trending-up.png'
                      width={18}
                      height={18}
                      alt='arrow'
                    />
                    <Text color='gray.400'>4% (30 days)</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Flex>
          {/* <Box h='100%' w='100%' bg='#fff' mt={5}>
            <ReactApexChart
              options={properties.options}
              series={properties.series}
              type='line'
              height={414}
              width={"100%"}
            />
          </Box> */}
          <Button
            mt={8}
            display='block'
            w='100%'
            colorScheme={"primaryColorScheme"}>
            Print Report
          </Button>
        </Box>
      </CDashboardLayout>
    </AdminAuth>
  );
};

export default Dashboard;
