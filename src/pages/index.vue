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

      <div class="row">
        <div class="col-12">
          <UserRecentTasks :userRecentTasks="userRecentTasks" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { useBreadcrumb } from "@bachdx/b-vuse";
const { setBreadcrumb } = useBreadcrumb();

import fetchData from "@/dataFetcher/homePage.js";

import UserWelcomeCard from "@/components/users/UserWelcomeCard.vue";

const analysesTotalSummarize = ref(null);
const userRecentTasks = ref([]);

onMounted(async () => {
  const result = await fetchData();

  analysesTotalSummarize.value = result.analysesTotalSummarize;
  userRecentTasks.value = result.userRecentTasks;
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
