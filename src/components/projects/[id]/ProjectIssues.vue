<template>
  <IssueSearch
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
