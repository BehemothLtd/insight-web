<template>
  <UsersAvatarGroup
    :users="projectUsers(project)"
    one-line
    :max="3"
  />
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
});

function projectUsers(project) {
  const users = [];

  project.projectAssignees.forEach(function (pa) {
    users.push(pa.user);
  });

  return users;
}
</script>
