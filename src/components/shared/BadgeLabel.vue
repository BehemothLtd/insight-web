<template>
  <a
    v-b-tooltip.hover
    class="badge"
    :class="extraClasses"
    :style="`background-color: ${usingColor};`"
    :title="text"
  >
    <i
      v-if="icon"
      class="align-middle"
      :class="icon"
    ></i>
    {{ text }}
  </a>
</template>

<script setup>
import { ref, watch } from "vue";

import getColorByCodes from "@/ultilities/colorMapping";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },

  icon: {
    type: String,
    required: false,
    default: "",
  },

  extraClasses: {
    type: Array,
    required: false,
    default: [],
  },

  target: {
    type: String,
    required: false,
    default: null,
  },

  code: {
    type: String,
    required: false,
    default: null,
  },

  color: {
    type: String,
    required: false,
  },
});

const usingColor = ref(null);

watch(
  () => props.color,
  (value) => {
    if (value) {
      usingColor.value = value;
    } else if (props.target && props.code) {
      usingColor.value = getColorByCodes(props.target, props.code);
    } else {
      usingColor.value = "#6c757d";
    }
  },
  {
    immediate: true,
  },
);
</script>
<style lang="scss" scoped>
a {
  &:hover {
    color: white;
  }
}
</style>
