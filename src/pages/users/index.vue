<template>
  <div class="row">
    <div class="col-lg-12">
      <!-- <BasicDataFilter
        v-if="searchFieldsList.length > 0"
        :search-fields-list="searchFieldsList"
        :query="queryInput.q"
        @search="searchList"
        @reset="resetQuerySearch"
      /> -->

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
import { useQuery, useBreadcrumb } from "@bachdx/b-vuse";

const { setBreadcrumb } = useBreadcrumb();
const query = ref({});

const { queryInput, updateQuery } = useQuery({
  perPage: 10,
  query: query,
});

const users = ref([]);
const metadata = ref({});

async function fetchListUser() {
  const result = await FetchUsers({
    input: {},
    query: {},
  });

  users.value = result.Users.collection;
  metadata.value = result.Users.metadata;
}

function onPageChange(page) {
  updatePage(page, fetchListUser);
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
