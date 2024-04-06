<template>
  <DatePicker
    v-model="searchDate"
    :class="usingClasses"
    :enable-time-picker="false"
    :placeholder="placeHolder"
    :modelType="options.modelFormat"
  />
</template>

<script setup>
import { computed } from "vue";

const searchDate = defineModel();

const props = defineProps({
  classes: {
    type: String,
    required: false,
    default: "w-100 p-1",
  },

  title: {
    type: String,
    required: false,
    default: "",
  },

  options: {
    type: Object,
    required: false,
    default: () => {
      return {
        modelFormat: "yyyy-MM-dd",
      };
    },
  },
});

const usingClasses = computed(() => {
  if (props.classes) return props.classes;
  else return "w-100 p-1";
});

const placeHolder = computed(() => {
  if (props.title) return props.title;
  else return "Search...";
});

defineExpose({
  clear,
});

function clear() {
  searchDate.value = null;
}
</script>

<style lang="scss" scoped>
:deep(.dp__input) {
  padding-left: 40px;
  &::placeholder {
    color: lightgray;
  }
}
</style>
