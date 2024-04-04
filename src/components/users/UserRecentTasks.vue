<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title mb-4">Recent Tasks</h4>

      <div class="table-responsive">
        <table class="table table-nowrap align-middle mb-0">
          <tbody>
            <tr v-for="task in userRecentTasks">
              <td>
                <h5 class="text-truncate font-size-14 m-0">
                  {{ task.title }}
                </h5>
              </td>
              <td>
                <UsersAvatarGroup
                  :users="task.assignees"
                  one-line
                  :max="3"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  userRecentTasks: Array,
});
</script>
