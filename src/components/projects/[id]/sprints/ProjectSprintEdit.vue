<template>
  <a
    v-b-tooltip.hover
    href="#"
    class="mr-2"
    title="Edit"
    @click.prevent="show()"
  >
    <i class="bx bx bx-edit-alt font-size-16"></i>

    <b-modal
      ref="modal"
      size="lg"
      centered
      title="Edit Sprint"
      title-class="font-18"
      hide-footer
    >
      <ProjectSprintForm
        v-if="editSprint"
        :form="editSprint"
      />

      <div class="modal-footer pb-0">
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
          data-bs-dismiss="modal"
          @click="submit"
        >
          Submit
        </button>
      </div>
    </b-modal>
  </a>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { cloneDeep, pick } from "lodash";

const props = defineProps({
  sprint: {
    type: Object,
    required: true,
  },
});

const editSprint = ref({});

onMounted(() => {});

import useModal from "@/composable/modal";
const { modal, showModal, hideModal } = useModal();

function show() {
  editSprint.value = cloneDeep(props.sprint.value);
  showModal();
}

async function submit() {
  if (result) {
    // editSprint.value = cloneDeep(sprintDetail.value);
  }
}
</script>
