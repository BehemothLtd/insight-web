<template>
  <div class="card task-box">
    <div class="card-body">
      <div>
        <IssueTitle :issue="issue" />
      </div>

      <div class="text-truncate text-muted">
        {{ issue.description }}
      </div>

      <div class="mt-1">
        <IssueStates
          :issue="issue"
          :showing="{ status: false }"
        />
      </div>

      <div class="d-flex justify-content-between align-items-end mt-3">
        <div class="team">
          <UsersAvatarGroup
            one-line
            :max="3"
            :users="issue.assignees"
          />
        </div>

        <div class="text-right">
          <UserAvatar
            v-if="issue.creator"
            :user="issue.creator"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  issue: {
    type: Object,
    default: {},
  },
});
</script>

<style lang="scss" scoped>
.task-box:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  cursor: pointer;
}
</style>
