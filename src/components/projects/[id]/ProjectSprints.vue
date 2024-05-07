<template>
  <div class="row">
    <div class="col-lg-6 sprint-column">
      <div
        class="accordion"
        role="tablist"
      >
        <ProjectSprintCard
          v-for="sprint in sprints"
          :sprint="sprint"
          :key="sprint.id"
          :write-permission="sprintWritePermission"
        >
        </ProjectSprintCard>
      </div>
    </div>

    <div class="col-lg-6 sprint-column"></div>
  </div>
</template>

<script setup>
import { inject, computed, ref, onMounted } from "vue";

import { FetchProjectSprints } from "@/apis/repositories";
// ===========PERMISSION========
const hasPermissionOn = inject("hasPermissionOn");

const issueWritePermission = computed(() =>
  hasPermissionOn("project_issues", "write"),
);

const sprintWritePermission = computed(() =>
  hasPermissionOn("project_sprints", "write"),
);

const project = defineModel();

const sprints = ref([]);

onMounted(async () => {
  const result = await FetchProjectSprints(project.value.id);

  if (result) {
    sprints.value = result.ProjectSprints;
  }
});
</script>
