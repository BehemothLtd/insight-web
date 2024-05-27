<template>
  <div class="table-responsive">
    <table
      class="table table-hover project-list-table table-nowrap align-middle table-borderless"
    >
      <thead class="thead-light">
        <tr>
          <th scope="col">User</th>
          <th scope="col">Approved</th>
          <th scope="col">Rejected</th>
          <th scope="col">Pedding</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="report in leaveDayRequestReport"
          :key="report.useId"
        >
          <td>
            <div class="mr-3">
              <UserAvatar :user="user(report)"></UserAvatar>
              {{ report.userName }}
            </div>
          </td>
          <td>{{ report.approvedTime }}</td>
          <td>{{ report.rejectedTime }}</td>
          <td>{{ report.pendingTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  leaveDayRequestReport: {
    type: Array,
    required: true,
  },
});

function user(report) {
  return {
    name: report.userName,
    avatarUrl: report.avatarKey,
  };
}
</script>
