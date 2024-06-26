<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex justify-content-between w-100">
        <h4 class="card-title">
          {{ project.name }}
        </h4>
      </div>
      <p class="card-title-desc text-truncate">
        {{ project.description }}
      </p>

      <div>
        <b-tabs
          content-class="mt-3"
          lazy
          v-model="currentTabIdx"
        >
          <b-tab
            v-for="tab in tabs"
            :key="tab.label"
            :title="tab.label"
            @click.prevent="changeTab(tab)"
            :disabled="tab.disabled"
          >
          </b-tab>
        </b-tabs>

        <div v-if="currentTabIdx == TAB_IDX['board']">
          <ProjectBoard v-model="project" />
        </div>

        <div v-show="currentTabIdx == TAB_IDX['issueStatuses']">
          <ProjectIssueStatuses v-model="project" />
        </div>

        <div v-show="currentTabIdx == TAB_IDX['basicInfo']">
          <ProjectSummary v-model="project" />
        </div>

        <div v-if="currentTabIdx == TAB_IDX['issues']">
          <ProjectIssues />
        </div>

        <div v-if="currentTabIdx == TAB_IDX['sprints']">
          <ProjectSprints
            v-model="project"
            ref="projectSprintsRef"
          />
        </div>
      </div>
    </div>
  </div>

  <IssueModal
    :project="project"
    @submitted="handleIssueModalEvent"
  />
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useBreadcrumb } from "@bachdx/b-vuse";
const { setBreadcrumb } = useBreadcrumb();

import { FetchProjectBasicInfo } from "@/apis/repositories";

setBreadcrumb({
  title: "Project",
  items: [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "Project",
      href: "/projects",
    },
    {
      text: "Detail",
      active: true,
    },
  ],
});

// ===========COMPONENT REFS===========
const projectSprintsRef = ref(null);

// ===========ROUTER=======
const route = useRoute();
const router = useRouter();

// ===========DATA=========
const projectId = route.params.id;
const project = ref({});

const currentTabIdx = ref(2); // Basic Information Tab is init page

async function fetchProject() {
  const result = await FetchProjectBasicInfo(projectId);
  project.value = result.Project;
}

watch(() => route.hash, setInitialTab);

onMounted(async () => {
  await fetchProject();
  setInitialTab();
});

function setInitialTab() {
  const hash = route.hash.replace("#", "");

  const currentTabIndex = tabs.value.find((tab) => tab.hashKey === hash)?.idx;

  if (currentTabIndex != null) {
    currentTabIdx.value = currentTabIndex;
  }
}

const TAB_IDX = {
  board: 0,
  issues: 1,
  basicInfo: 2,
  issueStatuses: 3,
  sprints: 4,
};

const tabs = computed(() => [
  {
    label: "Board",
    idx: TAB_IDX["board"],
    hashKey: "Board",
    disabled: false,
  },
  {
    label: "Issues",
    idx: TAB_IDX["issues"],
    hashKey: "Issues",
    disabled: false,
  },
  {
    label: "Basic Information",
    idx: TAB_IDX["basicInfo"],
    hashKey: "BasicInformation",
    disabled: false,
  },
  {
    label: "Issue Statuses",
    idx: TAB_IDX["issueStatuses"],
    hashKey: "IssueStatuses",
    disabled: false,
  },
  {
    label: "Sprints",
    idx: TAB_IDX["sprints"],
    hashKey: "Sprints",
    disabled: project.value.projectType == "kanban",
  },
]);

function changeTab(tab) {
  router.push({ hash: `#${tab.hashKey}` });
}

function handleIssueModalEvent(eventLog) {
  const event = eventLog.event;
  const location = eventLog.location;

  if (event == "updated") {
    if (location == "Sprints") {
      projectSprintsRef.value.onIssueUpdated();
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  min-height: calc(100vh - 220px);
}

.pin-icon {
  color: #556ee6;
}
</style>
