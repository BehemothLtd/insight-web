<template>
  <div class="card">
    <TimeLogHistoryFilter v-model="timelogHistoryInput" />
    <TimeLogHistoryList v-model="timelogHistoryInput" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useBreadcrumb } from "@bachdx/b-vuse";
const { setBreadcrumb } = useBreadcrumb();
import moment from "moment";

const timelogHistoryInput = ref({
  startDate: moment().startOf("week").add(1, "day").format("YYYY-MM-DD"),
  endDate: moment().endOf("week").add(1, "day").format("YYYY-MM-DD"),
});
setBreadcrumb({
  title: "Tempo Timesheets",
});
</script>
