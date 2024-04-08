<template>
  <div class="card">
    <div class="card-body">
      <apexchart
        type="line"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const series = ref([]);
const chartOptions = ref({});

onMounted(async () => {
  series.value = [
    {
      name: "Done Count",
      type: "column",
      data: props.data.series.done,
    },
    {
      name: "Not Done Count",
      type: "line",
      data: props.data.series.notDone,
    },
  ];

  chartOptions.value = {
    chart: {
      height: 350,
      type: "line",
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      text: "Assigned Issues State",
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: props.data.labels,
    xaxis: {
      type: "datetime",
    },
  };
});
</script>
