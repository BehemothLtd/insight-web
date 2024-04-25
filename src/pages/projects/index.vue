<template>
  <div>
    <div class="row">
      <ProjectActions v-model="viewMode" />

      <BasicDataFilter
        :search-fields-list="searchFieldsList"
        :query="query"
        @search="fetchList"
        @reset="resetQuerySearch"
      />

      <Transition name="fade">
        <ProjectCards
          v-if="viewMode == 'grid'"
          :projects="projects"
        />
      </Transition>

      <Transition name="fade">
        <ProjectList
          :projects="projects"
          v-if="viewMode == 'list'"
        />
      </Transition>

      <Pagination
        :meta="metadata"
        @change="onPageChange"
      ></Pagination>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useGoQuery, useBreadcrumb } from "@bachdx/b-vuse";
import useDynamicSearch from "@/composable/dynamicSearch";
import SearchField from "@/types/searchField";

import { FetchProjectList } from "@/apis/repositories";

const { setBreadcrumb } = useBreadcrumb();
setBreadcrumb({
  title: "Project List",
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
      text: "List",
      active: true,
    },
  ],
});

const { searchFieldsList, searchComponents } = useDynamicSearch();
searchFieldsList.value = [
  [
    new SearchField(
      "Name",
      "nameCont",
      "mdi mdi-magnify",
      searchComponents.TextInputField,
    ),
    new SearchField(
      "Description",
      "descriptionCont",
      "mdi mdi-magnify",
      searchComponents.TextInputField,
    ),
  ],
  [
    new SearchField(
      "Project Type",
      "projectTypeEq",
      "mdi mdi-cog-outline",
      searchComponents.SingleSelectField,
      {
        selectOptions: [
          {
            label: "Kanban",
            value: "kanban",
          },
          {
            label: "Scrum",
            value: "scrum",
          },
        ],
      },
    ),
    new SearchField(
      "Active",
      "stateEq",
      "mdi mdi-check-all",
      searchComponents.SingleSelectField,
      {
        selectOptions: [
          {
            label: "Active",
            value: "active",
          },
          {
            label: "Inactive",
            value: "inactive",
          },
        ],
      },
    ),
  ],
];

const query = ref({});
const { goQueryInput, updatePage, updateQuery } = useGoQuery({
  perPage: 10,
  query: query,
});

const projects = ref([]);
const metadata = ref({});
const viewMode = ref("grid");

async function fetchList() {
  const result = await FetchProjectList({
    input: goQueryInput.pagyInput,
    query: goQueryInput.query,
  });

  projects.value = result.Projects.collection;
  metadata.value = result.Projects.metadata;
}

function resetQuerySearch() {
  updateQuery({});
}

onMounted(async () => {
  await fetchList();
});

function onPageChange(page) {
  updatePage(page);
  fetchList();
}
</script>
