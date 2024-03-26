<template>
  <b-form-group
    :class="{
      required: required,
    }"
  >
    <legend
      v-if="label"
      class="col-form-label pt-0 font-weight-normal"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-danger"
      >
        *
      </span>
      <span
        v-if="icon"
        class="icon-container"
      >
        <i :class="`${icon}`"></i>
        <div
          v-if="description"
          class="description"
        >
          {{ description }}
        </div>
      </span>
    </legend>
    <div :class="{ 'has-error': errors.length }">
      <slot></slot>
      <div
        v-if="errors.length"
        class="validation"
      >
        <div
          v-for="(error, index) in errors"
          :key="index"
        >
          {{ error.replace("Base", "") }}
        </div>
      </div>
    </div>
  </b-form-group>
</template>

<script>
import { defineComponent, computed } from "vue";

import { useGlobalStore } from "@/stores/global";

export default defineComponent({
  props: {
    label: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
      required: false,
    },
    description: {
      type: String,
      default: null,
      required: false,
    },
  },

  setup(props) {
    const globalStore = useGlobalStore();

    const errors = computed(() => globalStore.getErrors(props.name));

    return {
      errors,
    };
  },
});
</script>

<style lang="scss" scoped>
.validation {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}

.required {
  legend::after {
    background: #f46a6a;
  }
}

.icon-container {
  position: relative;
  display: inline-block;
}

.description {
  position: absolute;
  z-index: 1000;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
  min-width: 200px;
}

.icon-container:hover .description {
  opacity: 1;
}
</style>
