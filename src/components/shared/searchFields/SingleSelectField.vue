<template>
  <div :class="classes">
    <VSelect
      v-model="inputValue"
      :options="options.selectOptions"
      :reduce="(option) => option.value"
      :placeholder="placeHolder"
      @option:selected="emitValue"
      @option:deselected="emitValue"
    >
    </VSelect>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

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

const inputValue = ref("");

const emit = defineEmits(["updated"]);

const placeHolder = computed(() => {
  if (props.title) return props.title;
  else return "Search...";
});

defineExpose({
  clear,
});

function emitValue() {
  emit("updated", inputValue);
}

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
