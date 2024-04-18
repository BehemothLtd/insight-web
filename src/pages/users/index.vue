<template>
  <div class="row">
    <div class="col-lg-12">
      <BasicDataFilter
        v-if="searchFieldsList.length > 0"
        :search-fields-list="searchFieldsList"
        :query="query"
        @search="searchList"
        @reset="resetQuerySearch"
      />

      <NewUser
        :write-permission="writePermission"
        @on-create="fetchListUser"
      />

      <UserList
        :users="users"
        :write-permission="writePermission"
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
import { onMounted, ref, inject, computed } from "vue";
import { FetchUsers, UserToggleState } from "@/apis/repositories";
import { useGoQuery, useBreadcrumb } from "@bachdx/b-vuse";
import { selectOptionsState } from "@/ultilities/selectOptions.js";

import useDynamicSearch from "@/composable/dynamicSearch";
import SearchField from "@/types/searchField";

const { setBreadcrumb } = useBreadcrumb();
const Swal = inject("Swal");

// =========== DATA ========
const query = ref({});
const users = ref([]);
const metadata = ref({});

const { goQueryInput, updatePage, updateQuery } = useGoQuery({
  perPage: 10,
  query: query,
});

// =========== PERMISSION ========
const hasPermissionOn = inject("hasPermissionOn");
const writePermission = computed(() => hasPermissionOn("users", "write"));

// =========== Search List ========
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
      "Email",
      "emailCont",
      "mdi mdi-email-outline",
      searchComponents.TextInputField,
    ),
  ],
  [
    new SearchField(
      "FullName",
      "fullNameCont",
      "mdi mdi-magnify",
      searchComponents.TextInputField,
    ),
    new SearchField(
      "SlackID",
      "slackIdCont",
      "mdi mdi-slack",
      searchComponents.TextInputField,
    ),
    new SearchField(
      "Active",
      "stateEq",
      "mdi mdi-check-all",
      searchComponents.SingleSelectField,
      {
        selectOptions: selectOptionsState,
      },
    ),
  ],
];

// =========== FUNCTION ========
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
  fetchListUser();
}

function resetQuerySearch() {
  updateQuery({});
}

async function toggleActiveUser(id) {
  return await UserToggleState(id);
}

async function handleToggleActiveAccount(data) {
  const confirmation = await Swal.fire({
    title: "Warning !",
    icon: "warning",
    text: "You want to change state ?",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  });

  if (confirmation.isConfirmed) {
    const result = await toggleActiveUser(data.id);

    if (!result) {
      // switch back in case doesn't success
      switchBackToggle(data);
    }
  } else switchBackToggle(data);
}

function switchBackToggle(data) {
  const userIndex = users.value.findIndex((u) => u.id == data.id);
  users.value[userIndex].state =
    users.value[userIndex].state == "active" ? "inactive" : "active";
}

onMounted(async () => {
  await fetchListUser();
});

setBreadcrumb({
  title: "User List",
  items: [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "User",
      href: "/users",
    },
  ],
});
</script>
