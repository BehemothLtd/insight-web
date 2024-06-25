<template>
  <div class="table-responsive">
    <table
      class="table table-hover project-list-table table-nowrap align-middle table-borderless"
    >
      <thead class="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Type</th>
          <th scope="col">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="issueStatus in issueStatuses"
          :key="issueStatus.id"
        >
          <td>
            <BadgeLabel
              :text="issueStatus.title"
              :extra-classes="['mt-1 p-2 text-capitalize']"
              :color="issueStatus.color"
            ></BadgeLabel>
          </td>
          <td>
            <BadgeLabel
              :text="issueStatus.statusType"
              :extra-classes="['mt-1 ml-2 p-2 text-capitalize']"
              :color="issueStatus.statusType == 'system' ? 'red' : 'green'"
            ></BadgeLabel>
          </td>
          <td>
            <span
              class="list-inline-item px-2 text-success"
              @click="$emit('showDetail', issueStatus.id)"
            >
              <i class="mdi mdi-pencil font-size-18"></i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  issueStatuses: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["showDetail"]);
</script>
