<template>
  <input
    v-model="inputValue"
    :placeholder="placeHolder"
    :class="usingClasses"
    type="text"
  />
</template>

<script setup>
import { computed } from "vue";

const inputValue = defineModel()

const props = defineProps({
  classes: {
    type: String,
    required: false,
    default: "form-control w-100",
  },

  title: {
    type: String,
    required: false,
    default: "",
  },
});

const emit = defineEmits(["updated"]);

const usingClasses = computed(() => {
  if (props.classes) return props.classes;
  else return "form-control w-100";
});

const placeHolder = computed(() => {
  if (props.title) return props.title;
  else return "Search...";
});

defineExpose({
  clear,
});

function clear() {
  inputValue.value = null;
  emit("updated", null);
}
</script>
