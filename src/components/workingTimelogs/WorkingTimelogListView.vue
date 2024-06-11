<template>
  <b-card>
    <b-row>
      <BasicDataFilter
        :search-fields-list="searchFieldsList"
        :query="query"
        search-title=""
        @search="fetchList"
      >
        <button
          name="button"
          class="btn btn-primary mr-2"
          @click="showModal()"
        >
          <i class="bx bx-plus-circle font-size-16 align-middle me-2"></i>
          Log Time
        </button>
      </BasicDataFilter>

      <WorkingTimelogModal
        ref="modalWorkingTimelog"
        :project-options="projectOptions"
        @reinit="showModal()"
        @refetch="refetchList"
      />

      <WorkingTimelogList
        :working-timelogs="workingTimelogs"
        :metadata="metadata"
        @onPageChange="onPageChange"
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
import { FetchSelectOptions } from "@/apis/repositories";

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
const { goQueryInput, resetQuery, updatePage } = useGoQuery({
  perPage: 50,
  query: query,
  page: 1,
});

const workingTimelogs = ref([]);
const metadata = ref({});
const projectOptions = ref([]);
const modalWorkingTimelog = ref();

async function fetchList() {
  const result = await fetchListWorkingLogs({
    input: goQueryInput.pagyInput,
    query: goQueryInput.query,
  });

  workingTimelogs.value = result.WorkingTimelogs.collection;
  metadata.value = result.WorkingTimelogs.metadata;
}

function refetchList() {
  resetQuery({});
  fetchList();
}

function showModal() {
  modalWorkingTimelog.value.show(null);
}

function onPageChange(page) {
  updatePage(page, fetchList);
}

onMounted(async () => {
  await fetchList();
  const response = await FetchSelectOptions(["currentUserProjects"]);
  projectOptions.value = response.SelectOptions.CurrentUserProjectOptions;
});
</script>

<style scoped></style>
