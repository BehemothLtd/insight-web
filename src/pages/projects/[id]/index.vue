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
            @click="changeTab(tab)"
          >
          </b-tab>
        </b-tabs>

        <div v-show="currentTabIdx == 0">
          <ProjectSummary v-model="project" />
        </div>

        <div v-show="currentTabIdx == 1">
          <ProjectIssueStatuses v-model="project" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
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

// ===========ROUTER=======
const route = useRoute();
const router = useRouter();

// ===========DATA=========
const projectId = route.params.id;
const project = ref({});

const currentTabIdx = ref(0);

async function fetchProject() {
  const result = await FetchProjectBasicInfo(projectId);
  project.value = result.Project;
}

watch(() => route.hash, setInitialTab);

onMounted(async () => {
  setInitialTab();

  await fetchProject();
});

function setInitialTab() {
  const hash = route.hash.replace("#", "");
  currentTabIdx.value = tabs.find((tab) => tab.hashKey === hash)?.idx || 0;
}

const tabs = [
  {
    label: "Basic Information",
    idx: 0,
    hashKey: "BasicInformation",
  },
  {
    label: "Issue Statuses",
    idx: 1,
    hashKey: "IssueStatuses",
  },
];

function changeTab(tab) {
  currentTabIdx.value = tab.idx;
  router.push({ hash: `#${tab.hashKey}` });
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
