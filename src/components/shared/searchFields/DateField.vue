<template>
  <DatePicker
    v-model="searchDate"
    :class="usingClasses"
    :enable-time-picker="false"
    :placeholder="placeHolder"
  />
</template>
<script setup>
import { ref, watch, computed } from "vue";

const searchDate = ref(null);

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
});
const usingClasses = computed(() => {
  if (props.classes) return props.classes;
  else return "w-100 p-1";
});

const placeHolder = computed(() => {
  if (props.title) return props.title;
  else return "Search...";
});

watch(searchDate, () => {
  emitUpdate();
});
const emit = defineEmits(["updated"]);

defineExpose({
  clear,
});

function clear() {
  searchDate.value = null;
  emitUpdate();
}
function emitUpdate() {
  emit("updated", searchDate);
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
