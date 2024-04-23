<template>
  <table
    class="table table-hover project-list-table table-nowrap align-middle table-borderless"
  >
    <thead class="thead-light">
      <tr>
        <th scope="col">ID</th>
        <th scope="col">User</th>
        <th scope="col">Description</th>
        <th scope="col">Time</th>
        <th scope="col">Date</th>
        <!-- <th scope="col">Action</th> -->
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="log in workingTimelogs"
        :key="log.id"
      >
        <td>{{ log.id }}</td>
        <td>
          <div class="d-flex align-items-center">
            {{ log.user?.name }}
          </div>
        </td>
        <td>
          <router-link
            class="d-block"
            :to="`/projects/${log.project?.id}?issueId=${log.issue?.id}#boards`"
          >
            {{ log.issue?.title }}
          </router-link>
          {{ log.description }}
        </td>
        <td>{{ filters.hoursWithMinutes(log.minutes) }}</td>
        <td>{{ log.loggedAt }}</td>
      </tr>
    </tbody>
  </table>

  <Pagination
    :meta="metadata"
    @change="onPageChange"
  ></Pagination>
</template>

<script setup>
defineProps({
  workingTimelogs: {
    type: Array,
    default: () => [],
  },
  metadata: {
    type: Object,
    default: () => {},
  },
});
</script>

<style scoped>
.btn-pointer {
  cursor: pointer;
}
</style>
