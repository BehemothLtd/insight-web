<template>Project Issues List</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const projectId = route.params.id;
console.log(projectId);
</script>
