<template>
  <b-modal
    :size="size"
    centered
    :title="title"
    title-class="font-18"
    hide-footer
  >
    <slot></slot>
    {{ modal }}

    <div class="modal-footer pb-0">
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
      >
        Close
      </button>
      <button
        type="button"
        class="btn btn-primary"
        @click="$emit('submit')"
      >
        Save
      </button>
    </div>
  </b-modal>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    required: false,
    default: "xl",
  },
  title: {
    type: String,
    required: true,
  },
  modal: {
    type: Boolean,
    required: true,
  },
});
</script>
