<template>
  <div class="row">
    <div class="col-md-3">
      <router-link to="/projects">
        <TotalCardItem
          label="Projects"
          icon="bx-briefcase-alt-2"
          :value="totalSummarize.ProjectCount"
        />
      </router-link>
    </div>
    <div class="col-md-3">
      <TotalCardItem
        label="Issues"
        :value="totalSummarize.IssueCount"
        icon="bx-task"
      />
    </div>
    <div class="col-md-3">
      <router-link to="/timesheets">
        <TotalCardItem
          label="Workings(h)"
          :value="totalWorkingHours"
          icon="bx-time"
        />
      </router-link>
    </div>
    <div class="col-md-3">
      <router-link to="/users">
        <TotalCardItem
          label="Members"
          :value="totalSummarize.MemberCount"
          icon="bx-user"
        />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

import TotalCardItem from "./TotalCardItem.vue";

const props = defineProps({
  totalSummarize: Object,
});

const totalWorkingHours = computed(() => {
  return (props.totalSummarize.WorkingTimeCount || 0) / 60;
});
</script>
