import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";

const SubscriptionsTabs = ({ children }) => {
  return (
    <Tabs isFitted variant={"unstyled"} defaultIndex={0}>
      <TabList bg='gray.100' borderRadius={"sm"}>
        <Tab
          borderRadius={"sm"}
          _selected={{
            color: "#fff",
            fontWeight: "bold",
            bg: "primary",
          }}>
          Day to Day
        </Tab>
        <Tab
          borderRadius={"sm"}
          _selected={{
            color: "#fff",
            fontWeight: "bold",
            bg: "primary",
          }}>
          Week to Week
        </Tab>
        <Tab
          borderRadius={"sm"}
          _selected={{
            color: "#fff",
            fontWeight: "bold",
            bg: "primary",
          }}>
          Month to Month
        </Tab>
        <Tab
          borderRadius={"sm"}
          _selected={{
            color: "#fff",
            fontWeight: "bold",
            bg: "primary",
          }}>
          Year to Year
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel p={0}>
          {children}
          <Box mt={4}>one</Box>
        </TabPanel>
        <TabPanel p={0}>
          {children}
          <Box mt={4}>two</Box>
        </TabPanel>
        <TabPanel p={0}>
          {children}
          <Box mt={4}>three</Box>
        </TabPanel>
        <TabPanel p={0}>
          {children}
          <Box mt={4}>four</Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SubscriptionsTabs;
