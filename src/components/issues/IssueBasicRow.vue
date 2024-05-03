<template>
  <tr class="cursor-pointer">
    <td>
      <IssueTitle
        :issue="issue"
        :title-length="titleLength"
      />

      <IssueStates :issue="issue" />
    </td>
    <td>
      <UsersAvatarGroup
        one-line
        :max="3"
        :users="issue.assignees"
      />
    </td>
    <td>
      <UserAvatar :user="issue.creator" />
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  issue: {
    type: Object,
    required: true,
  },
  sprintId: {
    type: [String, Number],
    default: null,
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  titleLength: {
    type: Number,
    required: false,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
tr {
  td {
    vertical-align: middle;
  }
}
</style>
