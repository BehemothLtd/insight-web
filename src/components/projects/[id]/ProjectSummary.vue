<template>
  <div class="row">
    <ProjectSummaryInfo v-model="project" />

    <ProjectAssignees v-model="project" />
  </div>
</template>

<script setup>
const project = defineModel();
</script>
