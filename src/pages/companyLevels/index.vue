<template>
  <div class="table-responsive">
    <table
      class="table table-hover project-list-table table-nowrap align-middle table-borderless"
    >
      <thead class="thead-light">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Title</th>
          <th scope="col">Users</th>
          <th scope="col">Code</th>
          <th scope="col">Hour Rate</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="companyLevel in CompanyLevels"
          :key="companyLevel.id"
        >
          <td>{{ companyLevel.id }}</td>
          <td>
            <BadgeLabel
              :text="companyLevel.title"
              :extra-classes="['p-2 text-capitalize']"
              :color="companyLevel.color"
              icon="bx bx-trending-up"
            ></BadgeLabel>
          </td>
          <td>
            <div class="avatar-group-item">
              <UsersAvatarGroup
                :users="filterUsers(companyLevel.id)"
                one-line
                :max="5"
              />
            </div>
          </td>
          <td>{{ companyLevel.code }}</td>
          <td>{{ companyLevel.hourRate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { useBreadcrumb, useGoQuery } from "@bachdx/b-vuse";
import { CompanyLevels } from "@/constants";
import { FetchUsers } from "@/apis/repositories";

const { setBreadcrumb } = useBreadcrumb();
const users = ref([]);
const query = ref({});

const { goQueryInput } = useGoQuery({
  perPage: 100,
  query: query,
});

setBreadcrumb({
  title: "Company Levels",
  items: [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "Company Levels",
      href: "/company_levels",
    },
    {
      text: "List",
      active: true,
    },
  ],
});

onMounted(async () => {
  await fetchListUser();
});

// =========== FUNCTION ========
async function fetchListUser() {
  const result = await FetchUsers({
    input: goQueryInput.pagyInput,
    query: goQueryInput.query,
  });

  users.value = result.Users.collection;
}

function filterUsers(companyLevelId) {
  return users.value.filter(
    (user) => Number(user.companyLevelId) === companyLevelId,
  );
}
</script>
