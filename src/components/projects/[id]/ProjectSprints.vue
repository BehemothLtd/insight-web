<template>
  <div class="actions">
    <button
      v-b-tooltip.hover
      title="Toggle filter"
      class="btn btn-light mr-2"
      @click="showFilters = !showFilters"
    >
      <i class="mdi mdi-filter"></i>
    </button>
  </div>

  <div class="row">
    <div class="col-lg-6 sprint-column">
      <div
        class="accordion"
        role="tablist"
      >
        <ProjectSprintCreate
          :projectId="project.id"
          v-if="sprintWritePermission"
        />

        <ProjectSprintCard
          v-for="sprint in sprints"
          ref="sprintRefs"
          :sprint="sprint"
          :project="project"
          :key="sprint.id"
          :write-permission="sprintWritePermission"
          @moved-issue-to="movedIssueIntoSprint"
        >
        </ProjectSprintCard>
      </div>
    </div>

    <div
      class="col-lg-6 sprint-column"
      @drop="dropIssue"
      @dragover.prevent
    >
      <IssueSearch
        v-model="query"
        @search="fetchIssuesList"
        v-if="showFilters"
      >
      </IssueSearch>

      <IssueList
        :issues="nonSprintIssues"
        :draggable="sprintWritePermission"
      />

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
import { find } from "lodash";
import { storeToRefs } from "pinia";

const Swal = inject("Swal");

import { useProjectSprintStore } from "@/stores/projectSprint";

const projectSprintStore = useProjectSprintStore();
const { sprints } = storeToRefs(projectSprintStore);

import {
  FetchProjectIssuesList,
  RemoveIssueOutOfSprint,
} from "@/apis/repositories";

const sprintRefs = ref([]);

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

const nonSprintIssues = ref([]);
const metadata = ref({});
const showFilters = ref(false);

onMounted(async () => {
  await fetchSprints();
  await fetchIssuesList();
});

async function fetchSprints() {
  projectSprintStore.fetchProjectSprints(project.value.id);
}

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
    const result = await RemoveIssueOutOfSprint(
      project.value.id,
      sprintId,
      issueId,
    );

    if (result) {
      movedIssueIntoSprint(sprintId);
    }
  }
}

async function movedIssueIntoSprint(sprintId) {
  fetchIssuesList();

  const targetSprint = find(
    sprintRefs.value,
    (sprint) => sprint.id == sprintId,
  );
  if (targetSprint) {
    targetSprint.fetchIssuesList();
  }
}
</script>

<style lang="scss" scoped>
.sprint-column {
  height: calc(100vh - 380px);
  overflow: auto;
  padding: 20px 10px;
  background-color: #f8f8f8;
  border-radius: 5px;
}
.actions {
  display: inline;
  position: absolute;
  right: 20px;
  top: 85px;
  text-align: right !important;
}
</style>
