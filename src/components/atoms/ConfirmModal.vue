<template>
  <b-modal
    id="modal-center"
    ref="modal"
    centered
    title="Confirm"
    title-class="font-18"
    hide-footer
  >
    <p>Do you want to delete this {{ name }}?</p>

    <div class="modal-footer pb-0">
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        @click="$emit('close')"
      >
        Close
      </button>
      <button
        type="button"
        class="btn btn-danger"
        @click="$emit('confirm')">
        Delete
      </button>
    </div>
  </b-modal>
</template>

<script setup>
const props = defineProps({
  description: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "item",
  },
});
</script>
