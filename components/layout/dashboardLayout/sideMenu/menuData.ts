export const menuData = (pathName: string, brnachId: string, token: string) => {
  // const DashboardData = [
  //   {
  //     icon: "/images/brand.png",
  //     name: "Sub Dashboard",
  //     link: `/dashboard`,
  //     count: -1,
  //     subMenu: [],
  //     active: pathName?.includes("dashboard"),
  //   },
  // ];
  return [
    {
      icon: "/images/brand.png",
      name: "System Logs",
      link: "/system-logs/1",
      count: -1,
      subMenu: [],
      active: pathName?.includes("system-logs"),
    },
    {
      icon: "/images/brand.png",
      name: "Notifications",
      link: "/notifications/1",
      count: -1,
      subMenu: [],
      active: pathName?.includes("notifications"),
    },
    {
      icon: "/images/brand.png",
      name: "Customer Accounts",
      link: "/customer-accounts/1",
      count: -1,
      subMenu: [],
      active: pathName?.includes("customer-accounts"),
    },
    {
      icon: "/images/brand.png",
      name: "Business Accounts",
      link: "/business-accounts/1",
      count: -1,
      subMenu: [],
      active: pathName?.includes("business-accounts"),
    },
    {
      icon: "/images/brand.png",
      name: "Customer Reports",
      link: "/customer-reports/1",
      count: -1,
      subMenu: [],
      active: pathName?.includes("customer-reports"),
    },
    {
      icon: "/images/brand.png",
      name: "Business Reports",
      link: "/business-reports/1",
      count: -1,
      subMenu: [],
      active: pathName?.includes("business-reports"),
    },
    {
      icon: "/images/brand.png",
      name: "Subscriptions",
      link: "/subscription-reports/1",
      count: -1,
      subMenu: [],
      active: pathName?.includes("subscription-reports"),
    },
    {
      icon: "/images/brand.png",
      name: "Manage Admins",
      link: "/manage-admins/1",
      count: -1,
      subMenu: [],
      active: pathName?.includes("manage-admins"),
    },
  ];
};
