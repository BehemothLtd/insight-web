<template>
  <div class="row">
    <div class="d-flex mt-3 mb-2">
      <button
        class="btn btn-primary ms-auto"
        type="button"
        @click="showModal()"
      >
        <i class="bx bx-plus-circle me-2"></i> New Experience
      </button>
    </div>

    <div class="row">
      <ExperienceCard
        v-for="experience in projectExperiences"
        :key="experience.id"
        :experience="experience"
        :write-permission="writePermission"
        v-bind="$attrs"
        @detail="showDetail"
        @delete="destroy"
      />
      <Pagination
        v-if="metadata.pages"
        :meta="metadata"
        @change="$emit('onPageChange', $event)"
      />
    </div>

    <div>
      <b-modal
        id="modal-edit"
        ref="modal"
        size="xl"
        title="Experience"
        hide-footer
        title-class="font-18"
        @hidden="handleCloseModal"
      >
        <ProjectExperienceForm
          v-model="projectExperience"
          v-bind="$attrs"
          @create="create"
          @update="update"
          @close="hideModal"
        />
      </b-modal>
    </div>
  </div>
</template>
<script setup>
import useModal from "@/composable/modal";
import { ref, computed, inject } from "vue";
import {
  ShowProjectExperience,
  SelfCreateProjectExperience,
  SelfUpdateProjectExperience,
  SelfDestroyProjectExperience,
} from "@/apis/repositories";
import { projectExperienceForm } from "@/formModels";

defineProps({
  projectExperiences: {
    type: Array,
    default: () => [],
  },
  metadata: {
    type: Object,
    default: () => {},
  },
  writePermission: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["refetch", "onPageChange"]);
const Swal = inject("Swal");

// =========HANDLE MODAL=========
const { modal, showModal, hideModal } = useModal();

function handleCloseModal() {
  projectExperience.value = {};
}

// =========DETAILS PROJECT-EXPERIENCE=========
const projectExperience = ref({});
const projectExperienceFormInput = computed(
  () => new projectExperienceForm(projectExperience.value),
);

async function showDetail(id) {
  const result = await ShowProjectExperience(id);

  projectExperience.value = result.ProjectExperience;
  if (projectExperience.value.id) {
    showModal();
  }
}

async function create() {
  const result = await SelfCreateProjectExperience({
    input: projectExperienceFormInput.value,
  });
  if (result) {
    await emits("refetch");
    hideModal();
  }
}

async function update(id) {
  const result = await SelfUpdateProjectExperience({
    id,
    input: projectExperienceFormInput.value,
  });
  if (result) {
    await emits("refetch");
    hideModal();
  }
}

async function destroy(id) {
  const confirmation = await Swal.fire({
    title: "Warning!",
    text: "Delete Project Experience?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete",
    cancelButtonText: "No",
  });
  if (confirmation.isConfirmed) {
    const result = await SelfDestroyProjectExperience(id);
    if (result) {
      await emits("refetch");
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.md-editor-footer-label) {
  margin: 0;
}
</style>
