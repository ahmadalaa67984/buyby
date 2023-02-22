import AdminAuth from "@/components/auth/AdminAuth";
import DSubscriptipons from "@/components/drawers/reports/DSubscriptipons";
import DSystemLogs from "@/components/drawers/reports/DSystemLogs";
import CDashboardLayout from "@/components/layout/dashboardLayout/CDashboardLayout";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

const Reports = () => {
  const [showSystemLogs, setShowSystemLogs] = useState<boolean>(false);
  const [showSubscriptions, setShowSubscriptions] = useState<boolean>(false);

  return (
    <AdminAuth>
      <CDashboardLayout title='Reports' description='Reports' count={""}>
        <Container maxW={"container.xl"}>
          <Flex p={8} mt={6} gridGap={3}>
            <Box
              bg='white'
              width={"100%"}
              height='150px'
              p={8}
              borderRadius='md'
              boxShadow={"md"}
              cursor='pointer'
              onClick={() => setShowSystemLogs((prev) => !prev)}>
              <Flex alignItems={"center"} h='100%' justifyContent={"center"}>
                <Text color='primary' fontWeight={"bold"} fontSize='large'>
                  System Logs
                </Text>
              </Flex>
            </Box>
            <DSystemLogs
              showSystemLogs={showSystemLogs}
              setShowSystemLogs={setShowSystemLogs}
            />
            <Box
              bg='white'
              width={"100%"}
              height='150px'
              p={8}
              borderRadius='md'
              boxShadow={"md"}
              cursor='pointer'
              onClick={() => setShowSubscriptions((prev) => !prev)}>
              <Flex alignItems={"center"} h='100%' justifyContent={"center"}>
                <Text color='primary' fontWeight={"bold"} fontSize='large'>
                  Subscriptions
                </Text>
              </Flex>
            </Box>
            <DSubscriptipons
              showSubscriptions={showSubscriptions}
              setShowSubscriptions={setShowSubscriptions}
            />
            <Box
              bg='white'
              width={"100%"}
              height='150px'
              p={8}
              borderRadius='md'
              boxShadow={"md"}
              cursor='pointer'>
              <Flex alignItems={"center"} h='100%' justifyContent={"center"}>
                <Text color='primary' fontWeight={"bold"} fontSize='large'>
                  Another
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </CDashboardLayout>
    </AdminAuth>
  );
};

export default Reports;
