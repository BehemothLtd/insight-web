<template>
  <BasicDataFilter
    :search-fields-list="searchFieldsList"
    :query="query"
    @search="fetchList"
  />

  <IssueList
    :issues="issues"
    :draggable="false"
  />

  <Pagination
    :meta="metadata"
    @change="onPageChange"
  ></Pagination>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useDynamicSearch from "@/composable/dynamicSearch";
import SearchField from "@/types/searchField";

const route = useRoute();
const router = useRouter();
const projectId = route.params.id;

import { useGoQuery, useBreadcrumb } from "@bachdx/b-vuse";
import {
  FetchProjectIssuesList,
  FetchSelectOptions,
} from "@/apis/repositories";

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

const { searchFieldsList, searchComponents } = useDynamicSearch();
const userOptions = ref([]);

searchFieldsList.value = [
  [
    new SearchField(
      "Title",
      "titleCont",
      "mdi mdi-magnify",
      searchComponents.TextInputField,
    ),
    new SearchField(
      "Code",
      "codeCont",
      "mdi mdi-magnify",
      searchComponents.TextInputField,
    ),
  ],
  [
    new SearchField(
      "Issue Type",
      "issueTypeEq",
      "mdi mdi-cog-outline",
      searchComponents.SingleSelectField,
      {
        selectOptions: [
          {
            label: "task",
            value: "task",
          },
          {
            label: "bug",
            value: "bug",
          },
        ],
      },
    ),
    new SearchField(
      "User",
      "userIdIn",
      "mdi mdi-cog-outline",
      searchComponents.MultipleSelectField,
      {
        selectOptions: userOptions,
      },
    ),
  ],
  [
    new SearchField(
      "DeadLine minimum than",
      "deadLineAtGteq",
      "",
      searchComponents.DateField,
      {
        modelFormat: "yyyy-MM-dd",
      },
    ),
    new SearchField(
      "DeadLine maximum Date",
      "deadLineAtLteq",
      "",
      searchComponents.DateField,
      {
        modelFormat: "yyyy-MM-dd",
      },
    ),
  ],
  // [
  //   new SearchField(
  //     "Priority",
  //     "priority_in",
  //     "mdi mdi-priority-high",
  //     searchComponents.MultipleSelectField,
  //     {
  //       selectOptions: [
  //         { label: "lowest", value: 1 },
  //         { label: "low", value: 2 },
  //         { label: "normal", value: 3 },
  //         { label: "high", value: 4 },
  //         { label: "highest", value: 5 },
  //       ],
  //     },
  //   ),
  // ],
];

const defaultQuery = { projectSprintIdEq: "", userIdIn: [] };

const query = ref(defaultQuery);
const { goQueryInput, updatePage, updateQuery } = useGoQuery({
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

function resetQuerySearch() {
  updateQuery(defaultQuery);
}

onMounted(async () => {
  const result = await FetchSelectOptions(["user"]);
  if (result.SelectOptions) {
    userOptions.value = result.SelectOptions.UserOptions;
  }
  userOptions.value.unshift({ label: "unassign", value: 0 });
  await fetchList();
});

function onPageChange(page) {
  updatePage(page);
  fetchList();
}
</script>
