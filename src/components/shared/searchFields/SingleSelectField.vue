<template>
  <div :class="classes">
    <VSelect
      v-model="inputValue"
      :options="options.selectOptions"
      :reduce="(option) => option.value"
      :placeholder="placeHolder"
    >
    </VSelect>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  classes: {
    type: String,
    required: false,
    default: "",
  },

  options: {
    type: Object,
    default: () => {},
  },

  title: {
    type: String,
    required: false,
    default: "",
  },
});

const inputValue = defineModel();

const emit = defineEmits(["updated"]);

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

<style lang="scss" scoped>
:deep(.vs__dropdown-toggle) {
  min-height: 40px;
  padding-left: 35px;
  .vs__search {
    font-size: 13px;
    &::placeholder {
      color: lightgray;
    }
  }
}
</style>
