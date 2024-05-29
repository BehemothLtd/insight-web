<template>
  <h1>Project Board</h1>

  <pre>{{ projectBoardData }}</pre>
</template>

<script setup>
import { ref, onMounted } from "vue";

const project = defineModel();

const projectBoardData = ref([]);

import { FetchProjectBoardData } from "@/apis/repositories";

onMounted(() => {
  FetchProjectBoardData(project.value.id).then((result) => {
    console.log(result);

    projectBoardData.value = result.ProjectBoard;
  });
});
</script>
