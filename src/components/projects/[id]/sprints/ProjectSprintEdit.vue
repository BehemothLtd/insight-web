<template>
  <a
    v-b-tooltip.hover
    href="#"
    class="mr-2"
    title="Edit"
    @click.prevent="showModal"
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
      <ProjectSprintForm :form="editSprint" />

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
import { ref } from "vue";
import { cloneDeep } from "lodash";

import { ProjectSprintForm as PSForm } from "@/formModels";
import { UpdateProjectSprint } from "@/apis/repositories";

const props = defineProps({
  sprint: {
    type: Object,
    required: true,
  },
});

const editSprint = ref(cloneDeep(props.sprint));

import useModal from "@/composable/modal";
const { modal, showModal, hideModal } = useModal();

const emit = defineEmits(["updated"]);

async function submit() {
  const form = new PSForm(editSprint.value);

  const result = await UpdateProjectSprint(
    props.sprint.projectId,
    props.sprint.id,
    form,
  );

  if (result) {
    editSprint.value = cloneDeep(result.ProjectSprintUpdate.projectSprint);
    emit("updated");
  }
}
</script>
