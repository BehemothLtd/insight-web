<template>
  <i
    v-b-tooltip.hover="issueType"
    class="bx "
    :class="iconClass"
  ></i>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  issueType: {
    type: String,
    required: true,
  },
});

const iconClass = computed(() => {
  switch (props.issueType) {
  case "task":
    return "bx bx-task text-primary";
  case "bug":
    return "bxs-bug text-danger";
  default:
    return "bx-bookmark";
  }
});
</script>
