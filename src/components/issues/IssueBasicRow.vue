<template>
  <tr
    class="cursor-pointer"
    :draggable="draggable"
    @dragstart="startDrag"
    @dragend="endDrag"
  >
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
import useDragging from "@/composable/dragging";
const { toggleDragging } = useDragging();

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

function endDrag() {
  toggleDragging(props.issue.projectSprintId);
  emits("drop");
}

function startDrag(event) {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";

  event.dataTransfer.setData("issueId", props.issue.id);
  event.dataTransfer.setData("issueTitle", props.issue.title);
  if (props.issue.projectSprintId)
    event.dataTransfer.setData("sprintId", props.issue.projectSprintId);

  toggleDragging(props.issue.projectSprintId);
}
</script>

<style lang="scss" scoped>
tr {
  td {
    vertical-align: middle;
  }
}
</style>
