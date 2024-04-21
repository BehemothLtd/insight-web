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

        <div class="col-12">
          <UserThisWeekTasksChart
            :data="selfThisWeekIssuesState"
            v-if="selfThisWeekIssuesState"
          />
        </div>
      </div>

      <ProjectIssuesGeneralChart
        :data="analysesProjectsIssueStatus"
        v-if="analysesProjectsIssueStatus"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { useBreadcrumb } from "@bachdx/b-vuse";
const { setBreadcrumb } = useBreadcrumb();

import fetchData from "@/dataFetcher/homePage.js";

const analysesTotalSummarize = ref(null);
const userRecentTasks = ref([]);
const analysesProjectsIssueStatus = ref(null);
const selfThisWeekIssuesState = ref(null);

onMounted(async () => {
  const result = await fetchData();

  analysesTotalSummarize.value = result.analysesTotalSummarize;
  userRecentTasks.value = result.userRecentTasks;
analysesProjectsIssueStatus.value = result.analysesProjectsIssueStatus;
  selfThisWeekIssuesState.value = result.selfThisWeekIssuesState;
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
