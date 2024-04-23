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
        >
          <b-tab
            v-for="tab in tabs"
            :key="tab.label"
            :title="tab.label"
            :active="currentTab == tab.hashKey"
            @click="currentTab = tab.hashKey"
          >
          </b-tab>
        </b-tabs>

        <ProjectSummary
          v-model="project"
          v-if="currentTab == 'BasicInformation'"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useBreadcrumb } from "@bachdx/b-vuse";
const { setBreadcrumb } = useBreadcrumb();

import { FetchProjectBasicInfo } from "@/apis/repositories";

import ProjectSummary from "@/components/projects/[id]/ProjectSummary.vue";

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

const currentTab = ref("BasicInformation");

async function fetchProject() {
  const result = await FetchProjectBasicInfo(projectId);
  project.value = result.Project;
}

onMounted(async () => {
  await fetchProject();
});

const tabs = computed(() => {
  let defaultTabs = [
    {
      label: "Basic Information",
      hashKey: "BasicInformation",
      component: ProjectSummary,
      active: true,
    },
  ];

  return defaultTabs;
});
</script>

<style lang="scss" scoped>
.card {
  min-height: calc(100vh - 220px);
}

.pin-icon {
  color: #556ee6;
}
</style>
