<template>
  <div :class="classes">
    <VSelect
      v-model="inputValue"
      multiple
      :options="options.selectOptions"
      :reduce="(option) => option.value"
      :placeholder="placeHolder"
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

const inputValue = defineModel();

const placeHolder = computed(() => {
  if (props.title) return props.title;
  else return "Search...";
});

defineExpose({
  clear,
});

function clear() {
  inputValue.value = [];
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
