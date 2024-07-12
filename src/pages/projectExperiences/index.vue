<template>
  <BasicDataFilter
    :search-fields-list="searchFieldsList"
    :query="query"
    @search="fetchList"
    @reset="resetQuery(fetchList)"
  />

  <ProjectExperience
    :project-experiences="projectExperiences"
    :metadata="metadata"
    :write-permission="writePermission"
    :project-options="projectOptions"
    @refetch="fetchList"
    @on-page-change="onPageChange"
  />
</template>

<script setup>
import { inject, ref, onMounted, computed } from "vue";

// ===========BREAD CRUMB========
import { useBreadcrumb } from "@bachdx/b-vuse";
const { setBreadcrumb } = useBreadcrumb();

setBreadcrumb({
  title: "Project Experience",
  items: [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "adminAttendance",
      href: "/adminAttendance",
      active: true,
    },
  ],
});

// ===========DYNAMIC SEARCH========
import SearchField from "@/types/searchField";
import useDynamicSearch from "@/composable/dynamicSearch";
import { FetchSelectOptions } from "@/apis/repositories";

const { searchFieldsList, searchComponents } = useDynamicSearch();
const projectOptions = ref([]);

searchFieldsList.value = [
  [
    new SearchField(
      "Project",
      "projectIdEq",
      "mdi mdi-cog-outline",
      searchComponents.SingleSelectField,
      {
        selectOptions: projectOptions,
      },
    ),
  ],
];

// ===========PERMISSION========
const hasPermissionOn = inject("hasPermissionOn");
const blockAccess = inject("blockAccess");

const writePermission = computed(() =>
  hasPermissionOn("project_experiences", "write"),
);

// ===========QUERIES============
import { useGoQuery } from "@bachdx/b-vuse";
import { SelfFetchProjectExperiences } from "@/apis/repositories";

const query = ref({});
const { goQueryInput, updatePage, resetQuery } = useGoQuery({
  perPage: 10,
  query: query,
});
const projectExperiences = ref([]);
const metadata = ref({});

async function fetchList() {
  const result = await SelfFetchProjectExperiences({
    input: goQueryInput.pagyInput,
    query: goQueryInput.query,
  });

  projectExperiences.value = result.SelfProjectExperiences.collection;
  metadata.value = result.SelfProjectExperiences.metadata;
}

function onPageChange(page) {
  updatePage(page);
  fetchList();
}

// ===========LIFE CYCLE===============
onMounted(async () => {
  if (!hasPermissionOn("project_experiences", "read")) {
    blockAccess();
  } else {
    const result = await FetchSelectOptions(["project"]);

    if (result.SelectOptions) {
      projectOptions.value = result.SelectOptions.ProjectOptions.map((item) => {
        return {
          label: item.label,
          value: String(item.value),
        };
      });
    }

    fetchList();
  }
});
</script>
