<template>
  <div class="d-flex text-right">
    <a
      v-b-tooltip.hover
      type="button"
      class="mr-2"
      title="Reload"
      @click.prevent="$emit('reload')"
    >
      <i class="bx bx-revision font-size-16"></i>
    </a>

    <ProjectSprintEdit
      v-if="sprintWritePermission"
      :sprint="sprint"
      @updated="$emit('updated')"
    />

    <a
      v-if="sprintDeletePermission && sprint.id != project.currentSprintId"
      v-b-tooltip.hover
      type="button"
      class="mr-2"
      title="Delete"
      @click.prevent="deleteSprint"
    >
      <i class="bx bx-trash font-size-16"></i>
    </a>

    <a
      v-if="!project.currentSprintId && sprintWritePermission"
      v-b-tooltip.hover
      type="button"
      class="mr-2"
      title="Start this sprint"
      @click.prevent="activeSprint"
    >
      <i class="bx bx-play font-size-16"></i>
    </a>

    <a
      v-if="sprint.id == project.currentSprintId && sprintWritePermission"
      v-b-tooltip.hover
      type="button"
      class="mr-2"
      title="Complete sprint"
      @click.prevent="completeSprint"
    >
      <i class="bx bx-archive font-size-16"></i>
    </a>
  </div>
</template>

<script setup>
import { inject, computed } from "vue";

const Swal = inject("Swal");

const props = defineProps({
  sprint: {
    type: Object,
    required: true,
  },
  project: {
    type: Object,
    required: true,
  },
});

defineEmits(["updated"]);

// ===========PERMISSION========
const hasPermissionOn = inject("hasPermissionOn");

const sprintWritePermission = computed(() =>
  hasPermissionOn("project_sprints", "write"),
);

const sprintDeletePermission = computed(() =>
  hasPermissionOn("project_sprints", "delete"),
);

async function activeSprint() {}

async function deactiveSprint() {}
async function completeSprint() {}

async function refreshWholeProjectIssueRelatedData() {}

async function deleteSprint() {}
</script>
<style lang="scss" scoped>
.sprint-btn {
  padding: 2px 8px;
}
</style>
