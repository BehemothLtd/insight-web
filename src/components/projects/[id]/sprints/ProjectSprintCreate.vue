<template>
  <div class="mb-2 text-right">
    <button
      type="button"
      class="btn btn-primary"
      @click="showModal()"
    >
      <i class="bx bx-plus-circle me-2"></i>
      New Sprint
    </button>

    <b-modal
      ref="modal"
      size="lg"
      centered
      title="Create New Sprint"
      title-class="font-18"
      hide-footer
    >
      <ProjectSprintForm :form="newSprint" />

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
  </div>
</template>

<script setup>
import { ref } from "vue";

import useModal from "@/composable/modal";
const { modal, showModal, hideModal } = useModal();

import { ProjectSprintForm as PSForm } from "@/formModels";
import { CreateProjectSprint } from "@/apis/repositories";

import { useProjectSprintStore } from "@/stores/projectSprint";
const projectSprintStore = useProjectSprintStore();

const newSprint = ref({});

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
});

async function submit() {
  const form = new PSForm(newSprint.value);

  const result = await CreateProjectSprint(props.projectId, form);

  if (result) {
    projectSprintStore.fetchProjectSprints(props.projectId);
    hideModal();
  }
}
</script>
