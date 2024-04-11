<template>
  <div class="row">
    <div class="col-lg-12">
      <BasicDataFilter
        v-if="searchFieldsList.length > 0"
        :search-fields-list="searchFieldsList"
        :query="queryInput.query"
        @search="searchList"
        @reset="resetQuerySearch"
      />

      <!-- <NewUser /> -->

      <UserList
        :users="users"
        @active-toggle="handleToggleActiveAccount"
      />

      <Pagination
        :meta="metadata"
        @change="onPageChange"
      ></Pagination>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { FetchUsers } from "@/apis/repositories";
import { useQuery, useGoQuery, useBreadcrumb } from "@bachdx/b-vuse";

import useDynamicSearch from "@/composable/dynamicSearch";
import SearchField from "@/types/searchField";

const { setBreadcrumb } = useBreadcrumb();
const query = ref({});
const users = ref([]);
const metadata = ref({});

const { queryInput } = useQuery({
  perPage: 10,
  query: query,
});

const { goQueryInput, updatePage, updateQuery } = useGoQuery({
  perPage: 10,
  query: query,
});

const { searchFieldsList, searchComponents } = useDynamicSearch();

searchFieldsList.value = [
  [
    new SearchField(
      "Name",
      "nameLike",
      "mdi mdi-magnify",
      searchComponents.TextInputField,
    ),
    new SearchField(
      "Email",
      "emailLike",
      "mdi mdi-email-outline",
      searchComponents.TextInputField,
    ),
  ],
  [
    new SearchField(
      "FullName",
      "fullNameLike",
      "mdi mdi-magnify",
      searchComponents.TextInputField,
    ),
    new SearchField(
      "SlackID",
      "slackIdLike",
      "mdi mdi-slack",
      searchComponents.TextInputField,
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

async function fetchListUser() {
  const result = await FetchUsers({
    input: goQueryInput.pagyInput,
    query: goQueryInput.query,
  });

  users.value = result.Users.collection;
  metadata.value = result.Users.metadata;
}

function onPageChange(page) {
  updatePage(page, fetchListUser);
}

function searchList() {
  query.value.page = 1;

  fetchListUser();
}

function resetQuerySearch() {
  query.value = {};

  updateQuery(query);
  fetchListUser();
}

onMounted(async () => {
  await fetchListUser();
});

setBreadcrumb({
  title: "User List",
  items: [
    {
      text: "Users",
      active: true,
    },
  ],
});
</script>
