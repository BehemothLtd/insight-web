<template>
  <div class="row">
    <div
      v-if="projectExperience"
      class="col-lg-12"
    >
      <div class="row mb-4">
        <FormValidator
          name="Title"
          label="Title"
          required
        >
          <input
            v-model="projectExperience.title"
            class="form-control"
            type="text"
            placeholder="Title"
          />
        </FormValidator>
      </div>

      <div class="row mb-4">
        <FormValidator
          name="ProjectId"
          label="Project"
          required
        >
          <el-select-v2
            v-model="projectExperience.projectId"
            class="w-100"
            filterable
            clearable
            :options="projectOptions"
            :searchable="true"
          />
        </FormValidator>
      </div>

      <div class="row mb-4">
        <FormValidator
          name="Description"
          label="Description"
          required
        >
          <MarkdownEditor
            v-model="projectExperience.description"
            :editor-id="`experience-editor`"
          />
        </FormValidator>
      </div>
    </div>
  </div>
  <div style="float: right">
    <button
      type="button"
      class="btn btn-secondary mr-2"
      data-bs-dismiss="modal"
      @click="$emit('close')"
    >
      Close
    </button>
    <button
      type="button"
      class="btn btn-primary"
      @click="handleSave"
    >
      Save
    </button>
  </div>
</template>

<script setup>
import MarkdownEditor from "@/components/molecules/common/MarkdownEditor.vue";

defineProps({
  projectOptions: {
    type: Array,
    default: () => [],
  },
});
const emits = defineEmits(["update", "create", "close"]);
const projectExperience = defineModel();

function handleSave() {
  if (projectExperience.value.id) {
    emits("update", projectExperience.value.id);
  } else emits("create");
}
</script>
