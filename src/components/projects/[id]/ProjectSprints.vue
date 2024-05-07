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

    <div
      class="col-lg-6 sprint-column"
      @drop="dropIssue"
      @dragover.prevent
    >
      <IssueList :issues="nonSprintIssues" />

      <Pagination
        v-if="metadata.pages && metadata.pages > 1"
        :meta="metadata"
        @change="onPageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { inject, computed, ref, onMounted } from "vue";

import { useGoQuery } from "@bachdx/b-vuse";

import {
  FetchProjectSprints,
  FetchProjectIssuesList,
} from "@/apis/repositories";

const query = ref({ projectSprintIdEq: null });

const { goQueryInput, updatePage } = useGoQuery({
  perPage: 10,
  query: query,
});
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
const nonSprintIssues = ref([]);
const metadata = ref({});

onMounted(async () => {
  FetchProjectSprints(project.value.id).then((result) => {
    sprints.value = result.ProjectSprints;
  });

  await fetchIssuesList();
});

async function fetchIssuesList() {
  const result = await FetchProjectIssuesList(
    project.value.id,
    goQueryInput.pagyInput,
    goQueryInput.query,
  );

  if (result) {
    nonSprintIssues.value = result.ProjectIssues.collection;
    metadata.value = result.ProjectIssues.metadata;
  }
}

function onPageChange(page) {
  updatePage(page);
  fetchIssuesList();
}

async function dropIssue(e) {
  const issueId = e.dataTransfer.getData("issueId");
  const issueTitle = e.dataTransfer.getData("issueTitle");
  const sprintId = e.dataTransfer.getData("sprintId");

  if (!sprintId) {
    return Swal.fire({
      title: "Notice !",
      icon: "warning",
      confirmButtonText: "Sure",
      html: "You cant drag like that",
      showCancelButton: false,
    });
  }

  const confirmation = await Swal.fire({
    title: "Notice !",
    icon: "warning",
    html:
      "Are you sure want to remove" +
      `<b> ${issueTitle} </b>` +
      "out of sprint?",
    showCancelButton: true,
    confirmButtonText: "Confirm",
    confirmButtonAriaLabel: "Thumbs up, great!",
    cancelButtonText: "Cancel",
    cancelButtonAriaLabel: "Thumbs down",
  });

  if (confirmation.isConfirmed) {
    console.log("jkelwqjklewqjkl");
  }
}
</script>
