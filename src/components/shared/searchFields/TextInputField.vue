<template>
  <input
    v-model="inputValue"
    :placeholder="placeHolder"
    :class="usingClasses"
    type="text"
    @input="$emit('updated', $event.target.value)"
  />
</template>

<script setup>
import { ref, computed } from "vue";

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

const usingClasses = computed(() => {
  if (props.classes) return props.classes;
  else return "form-control w-100";
});

const placeHolder = computed(() => {
  if (props.title) return props.title;
  else return "Search...";
});

const inputValue = ref(null);

const emit = defineEmits(["updated"]);

defineExpose({
  clear,
});

function clear() {
  inputValue.value = null;
  emit("updated", null);
}
</script>
