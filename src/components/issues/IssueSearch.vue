<template>
  <BasicDataFilter
    :search-fields-list="searchFieldsList"
    :query="query"
    @search="$emit('search')"
  >
  </BasicDataFilter>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useDynamicSearch from "@/composable/dynamicSearch";
import SearchField from "@/types/searchField";

const { searchFieldsList, searchComponents } = useDynamicSearch();
const userOptions = ref([]);
const projectIssueStatusOptions = ref([]);
import { useRoute } from "vue-router";
const route = useRoute();
const projectId = route.params.id;

const query = defineModel();

defineEmits(["search"]);

import { FetchSelectOptions } from "@/apis/repositories";

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
      "DeadLine From",
      "deadLineAtGteq",
      "",
      searchComponents.DateField,
      {
        modelFormat: "yyyy-MM-dd",
      },
    ),
    new SearchField(
      "DeadLine To",
      "deadLineAtLteq",
      "",
      searchComponents.DateField,
      {
        modelFormat: "yyyy-MM-dd",
      },
    ),
  ],
  [
    new SearchField(
      "Archived",
      "archivedEq",
      "mdi mdi-archive",
      searchComponents.SingleSelectField,
      {
        selectOptions: [
          { label: "True", value: true },
          { label: "False", value: false },
        ],
      },
    ),
    new SearchField(
      "Priority",
      "priorityEq",
      "mdi mdi-priority-high",
      searchComponents.SingleSelectField,
      {
        selectOptions: [
          { label: "lowest", value: "lowest" },
          { label: "low", value: "low" },
          { label: "normal", value: "normal" },
          { label: "high", value: "high" },
          { label: "highest", value: "highest" },
        ],
      },
    ),
    new SearchField(
      "Status",
      "issueStatusIdEq",
      "mdi mdi-cached",
      searchComponents.SingleSelectField,
      {
        selectOptions: projectIssueStatusOptions,
      },
    ),
  ],
];

onMounted(async () => {
  const result = await FetchSelectOptions(["user", "projectIssueStatus"], {
    projectId: projectId,
  });

  if (result.SelectOptions) {
    userOptions.value = result.SelectOptions.UserOptions;
    projectIssueStatusOptions.value =
      result.SelectOptions.ProjectIssueStatusOptions;
  }

  userOptions.value.unshift({ label: "unassign", value: 0 });
});
</script>
