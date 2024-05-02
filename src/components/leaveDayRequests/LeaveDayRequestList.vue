<template>
  <div class="table-responsive">
    <table
      class="table table-hover project-list-table table-nowrap align-middle table-borderless"
    >
      <thead class="thead-light">
        <tr>
          <th
            scope="col"
            style="width: 20px"
            class="align-middle"
          >
            ID
          </th>
          <th scope="col">User</th>
          <th scope="col">Type</th>
          <th scope="col">Description</th>
          <th scope="col">From</th>
          <th scope="col">To</th>
          <th scope="col">Time Off</th>
          <th scope="col">State</th>
          <th scope="col">Action</th>
          <th scope="col"></th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="request in leaveDayRequests"
          :key="request.id"
        >
          <td>{{ request.id }}</td>
          <td>
            <div class="mr-3">
              <UserAvatar :user="request.User"></UserAvatar>
              {{ request.User.name }}
            </div>
          </td>
          <td>
            {{ request.requestTypeHumanize }}
          </td>
          <td class="description-text">
            {{ request.reason }}
          </td>
          <td>
            {{ filters.fullDateTime(request.from) }}
          </td>
          <td>
            {{ filters.fullDateTime(request.to) }}
          </td>
          <td>
            {{ request.timeOff }}
          </td>
          <td>
            {{ request.requestStateHumanize }}
          </td>
          <td v-if="changeStatePermission">
            <div>
              <i
                v-b-tooltip.hover
                class="bx bx-like font-size-18 mr-2"
                title="Approve"
                @click="$emit('changeState', request.id, 'approved')"
              ></i>
              <i
                v-b-tooltip.hover
                class="bx bx-dislike font-size-18"
                title="Reject"
                @click="$emit('changeState', request.id, 'rejected')"
              ></i>
            </div>
          </td>
          <td>
            <i
              v-if="
                request.requestState == 'pending' && request.userId == userId
              "
              class="mdi mdi-pencil font-size-18 px-2 text-success"
              @click="$emit('showDetail', request.id)"
            ></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  leaveDayRequests: {
    type: Array,
    default: () => [],
  },
  changeStatePermission: {
    type: Boolean,
    default: true,
  },
  userId: {
    type: String,
    default: "",
  },
});

defineEmits(["changeState", "showDetail"]);
</script>

<style lang="scss" scoped>
.description-text {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mr-2 {
  margin-right: 2px;
}
</style>
