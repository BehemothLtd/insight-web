<template>
  <b-card>
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="data.Series"
    >
    </apexchart>
  </b-card>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const chartOptions = computed(() => {
  return {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    title: {
      text: "High Priority Project & Issues Status",
    },
    yaxis: {
      title: {
        text: "Projects",
      },
    },
    xaxis: {
      title: {
        text: "Issues Count",
      },
      categories: props.data.Categories,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " issues";
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
    },
  };
});
</script>
