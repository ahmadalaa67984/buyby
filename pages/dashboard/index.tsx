import AdminAuth from "@/components/auth/AdminAuth";
import CDashboardLayout from "@/components/layout/dashboardLayout/CDashboardLayout";
import React from "react";

const Dashboard = () => {
  return (
    <AdminAuth>
      <CDashboardLayout title={"Dashboard"} description='Dashboard' count={""}>
        dashboard
      </CDashboardLayout>
    </AdminAuth>
  );
};

export default Dashboard;
