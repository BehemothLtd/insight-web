<template>
  <b-modal
    ref="modal"
    centered
    :title="title"
    hide-footer
    title-class="font-18"
  >
    <FormValidator
      name="title"
      label="Title"
    >
      <input
        v-model="issueStatus.title"
        :disabled="!hasPermission"
        class="form-control w-100"
        type="text"
        placeholder="Title"
      />
    </FormValidator>

    <FormValidator
      name="color"
      label="Color"
      class="mt-2"
    >
      <input
        v-model="issueStatus.color"
        :disabled="!hasPermission"
        class="form-control w-100 p-1"
        type="color"
        placeholder="#409eff"
      />
    </FormValidator>

    <div
      v-if="hasPermission"
      class="modal-footer pb-0"
    >
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        @click="hideModal()"
      >
        Close
      </button>
      <button
        type="button"
        class="btn btn-primary"
        @click="$emit('submit', issueStatus)"
      >
        Save
      </button>
    </div>
  </b-modal>
</template>

<script setup>
import useModal from "@/composable/modal";
const { modal, showModal, hideModal } = useModal();

const issueStatus = defineModel();

defineProps({
  title: {
    type: String,
    default: "New issue status",
  },
  hasPermission: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["submit"]);
defineExpose({
  showModal,
  hideModal,
});
</script>
