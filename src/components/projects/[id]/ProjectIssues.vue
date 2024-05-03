<template>
  <IssueList
    :issues="issues"
    :draggable="false"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const projectId = route.params.id;

import { useGoQuery } from "@bachdx/b-vuse";

import { FetchProjectIssuesList } from "@/apis/repositories";

const query = ref({});
const { goQueryInput, updatePage, updateQuery } = useGoQuery({
  perPage: 10,
  query: query,
});
const issues = ref([]);
const metadata = ref({});

onMounted(async () => {
  const result = await FetchProjectIssuesList(projectId);

  if (result) {
    issues.value = result.ProjectIssues.collection;
    metadata.value = result.ProjectIssues.metadata;
  }
});
</script>
