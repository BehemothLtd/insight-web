<template>
  <div class="row">
    <ProjectCard
      v-for="project in projects"
      :key="project.id"
      :project="project"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup>
defineProps({
  projects: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>
