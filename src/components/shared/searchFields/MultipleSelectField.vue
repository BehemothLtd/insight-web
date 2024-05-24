<template>
  <div :class="classes">
    <VSelect
      v-model="inputValue"
      multiple
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
    default: () => {
      return {
        defaultValue: [],
      };
    },
  },

  title: {
    type: String,
    required: false,
    default: "",
  },
});

const inputValue = ref(props.options.defaultValue);
const emit = defineEmits(["updated"]);

const placeHolder = computed(() => {
  if (props.title) return props.title;
  else return "Search...";
});

function emitValue() {
  emit("updated", inputValue);
}

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
  padding-left: 40px;
  .vs__selected {
    color: #df861d;
    border: none;
    background-color: #fbe9d3;
    border-radius: 5px;
    button.vs__deselect {
      margin-left: 10px;
      svg {
        fill: #df861d;
      }
    }
  }
  .vs__search {
    font-size: 13px;
    &::placeholder {
      color: lightgray;
    }
  }
}
</style>
