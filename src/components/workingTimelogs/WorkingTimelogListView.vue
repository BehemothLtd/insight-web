<template>
  <b-card>
    <b-row>
      <BasicDataFilter
        :search-fields-list="searchFieldsList"
        :query="query"
        search-title=""
        @search="fetchList"
        @reset="resetQuerySearch"
      >
      </BasicDataFilter>

      <WorkingTimelogList
        :working-timelogs="workingTimelogs"
        :metadata="metadata"
      />
    </b-row>
  </b-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useGoQuery } from "@bachdx/b-vuse";
import useDynamicSearch from "@/composable/dynamicSearch";
import SearchField from "@/types/searchField";

import { fetchListWorkingLogs } from "@/apis/repositories";

const { searchFieldsList, searchComponents } = useDynamicSearch();
searchFieldsList.value = [
  [
    new SearchField(
      "Description",
      "descriptionCont",
      "mdi mdi-magnify",
      searchComponents.TextInputField,
    ),
  ],
  [
    new SearchField(
      "Issue Title",
      "issueTitleCont",
      "mdi mdi-magnify",
      searchComponents.TextInputField,
    ),
    new SearchField(
      "Issue Code",
      "issueCodeEq",
      "mdi mdi-magnify",
      searchComponents.TextInputField,
    ),
  ],
];

const query = ref({});
const { goQueryInput, updateQuery } = useGoQuery({
  perPage: 50,
  query: query,
  page: 1,
});

const workingTimelogs = ref([]);
const metadata = ref({});

async function fetchList() {
  const result = await fetchListWorkingLogs({
    input: goQueryInput.pagyInput,
    query: goQueryInput.query,
  });

  workingTimelogs.value = result.WorkingTimelogs.collection;
  metadata.value = result.WorkingTimelogs.metadata;
}

function resetQuerySearch() {
  updateQuery({});
}

onMounted(async () => {
  await fetchList();
});
</script>

<style scoped></style>
