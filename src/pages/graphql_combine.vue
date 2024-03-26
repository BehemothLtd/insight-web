<template>
  <div class="row"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { useBreadcrumb } from "@bachdx/b-vuse";

const { setBreadcrumb } = useBreadcrumb();

import combineQuery from "graphql-combine-query";
import api from "@/apis/axios";
import gql from "graphql-tag";

const UserGroups = gql`
  query UserGroups($userGroupInput: PagyInput, $userGroupsQuery: UserGroupsQuery) {
    UserGroups(input: $userGroupInput, query: $userGroupsQuery) {
      collection {
        id
        title
        createdAt
        updatedAt
      }
    }
  }
`;

const Users = gql`
  query Users($userInput: PagyInput, $userQuery: UsersQuery) {
    Users(input: $userInput, query: $userQuery) {
      collection {
        id
        name
      }
    }
  }
`;

const combineQL = combineQuery("Example")
  .add(UserGroups)
  .add(Users).document

const demo = async() => {
  const data = await api(combineQL);

  console.log(data)
}

onMounted(() => {
  demo();
})
setBreadcrumb({
  title: "GraphqlCombine",
  items: [
    {
      text: "GraphqlCombine",
      active: true,
    },
  ],
});
</script>
