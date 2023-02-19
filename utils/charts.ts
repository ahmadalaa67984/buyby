export const dumyData: any = [
  {
    title: "This Month",
    date: "2/7/2022",
    value: 90,
    color: "primaryColorScheme",
  },
  {
    title: "Previous Month",
    date: "2/7/2022",
    value: 70,
    color: "primaryColorScheme",
  },
];

export const latestInvoiceDummyData = [
  {
    customerName: "Mohammed",
    phone: "0133223232",
    email: "test@gmail.com",
    total: 400,
  },
  {
    customerName: "Assem",
    phone: "0133223232",
    email: "test1@gmail.com",
    total: 500,
  },
  {
    customerName: "Ahmed",
    phone: "0133223232",
    email: "test2@gmail.com",
    total: 600,
  },
  {
    customerName: "Karim",
    phone: "0133223232",
    email: "test3@gmail.com",
    total: 700,
  },
  {
    customerName: "Mohsen",
    phone: "0133223232",
    email: "test4@gmail.com",
    total: 800,
  },
];

export const halfCircleChartProp = (percent: any) => ({
  series: [percent],
  options: {
    chart: {
      type: "radialBar",
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "57%",
          margin: 5, // margin is in pixels

          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: "0px",
            fontWeight: "700",
          },
        },
      },
    },
    grid: {
      padding: {
        top: -5,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    labels: ["500"],
  },
});

export const lineChartProps = (labels: any) => ({
  series: [
    {
      name: "",
      type: "line",
      data: [100, 500, 1000, 2500, 1000, 500, 300, 500, 4000, 1500, 500, 1000],
    },
  ],
  options: {
    colors: ["#5211A5", "rgba(82, 17, 165, .3)"],
    chart: {
      height: 414,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "line",
      opacity: [0.75, 1],
    },
    labels: labels,
    markers: {
      size: 0,
    },
    yaxis: {
      categories: ["ABC", "PQR", "XYZ"],
      title: {
        // text: "Series A",
      },
    },
    // {
    //   opposite: true,
    //   title: {
    //     // text: "Series B",
    //   },
    // },

    // xaxis: {
    //   categories: ["ABC", "PQR", "XYZ"],
    //   tickPlacement: "on",
    // },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y: any) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " $";
          }
          return y;
        },
      },
    },
  },
});
