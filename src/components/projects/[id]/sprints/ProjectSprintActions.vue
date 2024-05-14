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
    />

    <a
      v-if="sprintDeletePermission && sprint.id != project.currentSprintId"
      v-b-tooltip.hover
      type="button"
      class="mr-2"
      title="Delete"
      @click.prevent="deleteSprint"
    >
      <i
        class="bx bx-trash font-size-16"
        style="color: red"
      ></i>
    </a>

    <a
      v-if="sprint.id != project.currentSprintId && sprintWritePermission"
      v-b-tooltip.hover
      type="button"
      class="mr-2"
      title="Start this sprint"
      @click.prevent="activeSprint"
    >
      <i
        class="bx bx-play font-size-16"
        style="color: green"
      ></i>
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
import { storeToRefs } from "pinia";

const Swal = inject("Swal");
import { useRoute, useRouter } from "vue-router";

import {
  ActiveProjectSprint,
  DeleteProjectSprint,
  ArchiveProjectSprint,
} from "@/apis/repositories";

import { useProjectSprintStore } from "@/stores/projectSprint";
const projectSprintStore = useProjectSprintStore();

const { sprints } = storeToRefs(projectSprintStore);

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

const route = useRoute();
const router = useRouter();

// ===========PERMISSION========
const hasPermissionOn = inject("hasPermissionOn");

const sprintWritePermission = computed(() =>
  hasPermissionOn("project_sprints", "write"),
);

const sprintDeletePermission = computed(() =>
  hasPermissionOn("project_sprints", "delete"),
);

async function activeSprint() {
  const confirmation = await Swal.fire({
    icon: "warning",
    html: `Active <b> ${props.sprint.title} </b> sprint?`,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  });

  if (!confirmation.isConfirmed) {
    return;
  }

  const result = await ActiveProjectSprint(
    props.sprint.id,
    props.sprint.projectId,
  );

  if (result) {
    router.go(route.name);
  }
}

async function completeSprint() {
  console.log(sprints.value);
  console.log(props.sprint.id);
  const sprintOptions = sprints.value
    .filter((s) => Number(s.id) != props.sprint.id)
    .reduce((a, v) => ({ ...a, [v.id]: v.title }), {});

  const { value: selectedSprint } = await Swal.fire({
    icon: "warning",
    title: `You must finish all issue first or move all remaining issues to another sprint`,
    input: "select",
    inputOptions: sprintOptions,
    inputPlaceholder: "Select sprint",
    showCancelButton: true,
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (value) {
          resolve();
        } else {
          resolve(`You must select new sprint for all the remaining issues`);
        }
      });
    },
  });

  if (!selectedSprint) {
    return;
  }

  const result = await ArchiveProjectSprint(
    props.sprint.id,
    props.sprint.projectId,
    `${selectedSprint}`,
  );
  if (result) {
    router.go(route.name);
  }
}

async function refreshWholeProjectIssueRelatedData() {}

async function deleteSprint() {
  const confirmation = await Swal.fire({
    title: "Warning !",
    icon: "warning",
    html:
      "Are you sure want to delete sprint" + `<b> ${props.sprint.title} </b> ?`,
    text: "You won't be able to revert this!",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  });

  if (!confirmation.isConfirmed) {
    return;
  }

  const result = await DeleteProjectSprint(
    props.sprint.id,
    props.sprint.projectId,
  );

  if (result) {
    projectSprintStore.fetchProjectSprints(props.sprint.projectId);
  }
}
</script>

<style lang="scss" scoped>
.sprint-btn {
  padding: 2px 8px;
}
</style>
