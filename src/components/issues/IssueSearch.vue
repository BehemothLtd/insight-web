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
];

onMounted(async () => {
  const result = await FetchSelectOptions(["user"]);
  if (result.SelectOptions) {
    userOptions.value = result.SelectOptions.UserOptions;
  }
  userOptions.value.unshift({ label: "unassign", value: 0 });
});
</script>
