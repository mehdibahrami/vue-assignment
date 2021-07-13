import {
  SPEED_LIMIT,
  LOW_CHARGE,
  MID_CHARGE,
  MAX_CHARGE,
  MIN_CHARGE,
  MAX_SPEED,
  MIN_SPEED,
} from "@/constants";

import styles from "@/assets/scss/_export.scss";

// Default gauge chart options
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
          color: styles.gray,
          show: true,
        },
        value: {
          offsetY: -10,
          color: styles.purple,
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

// Speed gauge chart options
export const speedGaugeChartOptions = {
  ...defaultGaugeChart,
  fill: {
    colors: [
      function ({ value }) {
        if (value <= SPEED_LIMIT) {
          return styles.green;
        } else {
          return styles.red;
        }
      },
    ],
    type: "solid",
  },
  labels: ["km/h"],
};

// SoC gauge chart options
export const socGaugeChartOptions = {
  ...defaultGaugeChart,
  fill: {
    colors: [
      function ({ value }) {
        if (value <= LOW_CHARGE) {
          return styles.red;
        } else if (value > LOW_CHARGE && value <= MID_CHARGE) {
          return styles.orange;
        } else {
          return styles.green;
        }
      },
    ],
    type: "solid",
  },
  labels: ["%"],
};

// Default line chart options
const defaultLineChart = {
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
};

// Speed line chart options
export const speedLineChartOptions = {
  ...defaultLineChart,
  chart: {
    id: "realtime",
    type: "line",
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    animations: {
      enabled: true,
      speed: 500,
      easing: "easein",
      dynamicAnimation: {
        enabled: true,
        speed: 1000,
      },
    },
  },
  colors: [styles.green],
  xaxis: {
    tickAmount: 5,
    range: 600000,
    labels: {
      formatter: function (val, timestamp) {
        return new Date(timestamp).toLocaleTimeString([], {
          hour12: false,
        });
      },
      offsetX: -15,
    },
  },
  yaxis: {
    min: MIN_SPEED,
    max: MAX_SPEED,
    tickAmount: 5,
    opposite: true,
    labels: {
      offsetX: -10,
    },
  },
  stroke: {
    curve: "smooth",
    width: 4,
  },
  tooltip: {
    x: {
      show: true,
      formatter: function (val) {
        return new Date(val).toLocaleTimeString([], {
          hour12: false,
        });
      },
    },
    y: {
      formatter: function (value) {
        return value + " km/h";
      },
      title: "Speed",
    },
  },
};

// Speed line chart set color function
export function setSpeedLineChartColor() {
  if (this.data.y) {
    if (this.data.y <= SPEED_LIMIT) {
      this.$refs.chart.updateOptions({
        colors: [styles.green],
      });
    } else {
      this.$refs.chart.updateOptions({
        colors: [styles.red],
      });
    }
  }
}

// SoC line chart options
export const socLineChartOptions = {
  ...defaultLineChart,
  chart: {
    id: "realtime",
    type: "area",
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    animations: {
      enabled: true,
      speed: 500,
      easing: "linear",
      dynamicAnimation: {
        enabled: true,
        speed: 1000,
      },
    },
  },
  colors: [styles.green],
  xaxis: {
    tickAmount: 5,
    range: 600000,
    labels: {
      formatter: function (val, timestamp) {
        return new Date(timestamp).toLocaleTimeString([], {
          hour12: false,
        });
      },
      offsetX: -15,
    },
  },
  stroke: {
    width: 4,
  },
  yaxis: {
    min: MIN_CHARGE,
    max: MAX_CHARGE,
    tickAmount: 5,
    opposite: true,
    labels: {
      offsetX: -10,
      formatter: (value) => {
        return parseInt(value);
      },
    },
  },
  tooltip: {
    x: {
      show: true,
      formatter: function (val) {
        return new Date(val).toLocaleTimeString([], {
          hour12: false,
        });
      },
    },
    y: {
      formatter: function (value) {
        return value + " %";
      },
      title: "SoC",
    },
  },
};

// SoC line chart set color function
export function setSocLineChartColor() {
  if (this.data.y) {
    if (this.data.y >= MID_CHARGE) {
      this.$refs.chart.updateOptions({
        colors: [styles.green],
      });
    } else if (this.data.y < MID_CHARGE && this.data.y >= LOW_CHARGE) {
      this.$refs.chart.updateOptions({
        colors: [styles.orange],
      });
    } else {
      this.$refs.chart.updateOptions({
        colors: [styles.red],
      });
    }
  }
}
