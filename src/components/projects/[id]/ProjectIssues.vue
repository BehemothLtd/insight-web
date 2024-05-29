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
  <IssueSearch
    v-if="showFilters"
    v-model="query"
    @search="fetchList"
  >
  </IssueSearch>

  <IssueList
    :issues="issues"
    :draggable="false"
  />

  <Pagination
    v-if="metadata.total > 0"
    :meta="metadata"
    @change="onPageChange"
  ></Pagination>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const projectId = route.params.id;

import { useGoQuery, useBreadcrumb } from "@bachdx/b-vuse";
import { FetchProjectIssuesList } from "@/apis/repositories";

const { setBreadcrumb } = useBreadcrumb();
// ===========BREADCRUMB=========
setBreadcrumb({
  title: "Project Issues",
  items: [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "Projects",
      href: "/projects",
    },
    {
      text: projectId,
      href: `/projects/${projectId}`,
    },
    {
      text: "Issues",
      active: true,
    },
  ],
});

const defaultQuery = { projectSprintIdEq: "", userIdIn: [] };

const query = ref(defaultQuery);
const { goQueryInput, updatePage } = useGoQuery({
  perPage: 10,
  query: query,
});
const issues = ref([]);
const metadata = ref({});
const showFilters = ref(false);

async function fetchList() {
  const result = await FetchProjectIssuesList(
    projectId,
    goQueryInput.pagyInput,
    goQueryInput.query,
  );

  if (result) {
    issues.value = result.ProjectIssues.collection;
    metadata.value = result.ProjectIssues.metadata;
  }
}

onMounted(async () => {
  await fetchList();
});

function onPageChange(page) {
  updatePage(page);
  fetchList();
}
</script>

<style lang="scss" scoped>
.actions {
  display: inline;
  position: absolute;
  right: 15px;
  top: 50px;
  text-align: right !important;
}
</style>
