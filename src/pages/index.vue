<template>
  <div class="row">
    <div class="col-xl-4">
      <UserWelcomeCard></UserWelcomeCard>
    </div>

    <div class="col-xl-8">
      <TotalSummaryReport
        :totalSummarize="analysesTotalSummarize"
        v-if="analysesTotalSummarize"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";

import { useBreadcrumb } from "@bachdx/b-vuse";
const { setBreadcrumb } = useBreadcrumb();

import fetchData from "@/dataFetcher/homePage.js";

import UserWelcomeCard from "@/components/users/UserWelcomeCard.vue";

const analysesTotalSummarize = ref(null);

onBeforeMount(async () => {
  const result = await fetchData();

  analysesTotalSummarize.value = result.analysesTotalSummarize;
});

setBreadcrumb({
  title: "DASHBOARD",
  items: [
    {
      text: "Dashboard",
      active: true,
    },
  ],
});
</script>
