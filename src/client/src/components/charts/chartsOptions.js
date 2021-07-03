import { SPEED_LIMIT, LOW_CHARGE, MID_CHARGE } from "@/constants";

const defaultGaugeChart = {
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: {
        size: "65%",
      },
      track: {
        show: true,
        strokeWidth: "20%",
      },
      dataLabels: {
        name: {
          offsetY: 25,
          color: "#6b7280",
          show: true,
        },
        value: {
          offsetY: -10,
          color: "#8a63a3",
          fontSize: "2rem",
          formatter(val) {
            return `${parseFloat(val)}`;
          },
        },
      },
    },
  },
  chart: {
    sparkline: {
      enabled: true,
    },
  },
};

export const speedGaugeChartOptions = {
  ...defaultGaugeChart,
  fill: {
    colors: [
      function ({ value }) {
        if (value <= SPEED_LIMIT) {
          return "#7ca363";
        } else {
          return "#AD6D6D";
        }
      },
    ],
    type: "solid",
  },
  labels: ["km/h"],
};

export const socGaugeChartOptions = {
  ...defaultGaugeChart,
  fill: {
    colors: [
      function ({ value }) {
        if (value <= LOW_CHARGE) {
          return "#AD6D6D";
        } else if (value > LOW_CHARGE && value <= MID_CHARGE) {
          return "#C38540";
        } else {
          return "#7ca363";
        }
      },
    ],
    type: "solid",
  },
  labels: ["%"],
};
