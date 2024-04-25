<template>
  <div class="card-body">
    <div class="row mb-3">
      <div class="col-lg-4">
        <div>
          <FormValidator
            name="Name"
            label="Project Name"
            required
          >
            <input
              v-model="project.name"
              type="text"
              class="form-control"
              :disabled="!writePermission"
            />
          </FormValidator>
        </div>
      </div>

      <div class="col-lg-4">
        <div>
          <FormValidator
            name="Code"
            label="Project Code"
            required
          >
            <input
              v-model="project.code"
              disabled
              type="text"
              class="form-control"
            />
          </FormValidator>
        </div>
      </div>

      <div class="col-lg-4">
        <div>
          <FormValidator
            name="project_priority"
            label="Project Priority"
            required
          >
            <select
              v-model="project.projectPriority"
              class="form-control"
              :disabled="!writePermission"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </FormValidator>
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-lg-12">
        <FormValidator
          name="Description"
          label="Project Description"
          required
        >
          <textarea
            v-model="project.description"
            class="form-control"
            rows="6"
            :disabled="!writePermission"
          />
        </FormValidator>
      </div>
    </div>

    <div class="form-group row mb-3">
      <div class="col-lg-6">
        <FormValidator
          name="ClientId"
          label="Client"
        >
          <el-select-v2
            v-model="project.clientId"
            class="w-100"
            :options="clientOptions"
            filterable
            clearable
            :disabled="!writePermission"
          />
        </FormValidator>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-lg-6">
        <FormValidator
          name="State"
          label="Project State"
          required
        >
          <div
            v-if="writePermission"
            class="form-check form-switch form-switch-lg mb-3"
          >
            <input
              v-model="project.state"
              class="form-check-input"
              type="checkbox"
              true-value="active"
              false-value="inactive"
            />
          </div>

          <BadgeLabel
            v-else-if="project.state"
            :text="project.state"
            :extra-classes="['mt-1 p-2 text-capitalize']"
            :color="project.state == 'active' ? 'green' : 'gray'"
          />
        </FormValidator>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-lg-6">
        <FormValidator
          name="project_type"
          label="Project Type"
          required
        >
          <div
            v-if="writePermission"
            class="form-check form-switch form-switch-lg mb-3"
          >
            <label>{{ project.projectType }}</label>

            <input
              v-model="project.projectType"
              class="form-check-input"
              type="checkbox"
              true-value="scrum"
              false-value="kanban"
            />
          </div>

          <BadgeLabel
            v-else-if="project.projectType"
            :text="project.projectType"
            :extra-classes="['mt-1 p-2 text-capitalize']"
            color="pink"
          />
        </FormValidator>
      </div>

      <div
        v-if="project.projectType == 'scrum'"
        class="col-lg-6"
      >
        <FormValidator
          name="SprintDuration"
          label="Sprint Duration"
          required
        >
          <select
            v-model="project.sprintDuration"
            class="form-select"
            :disabled="!writePermission"
          >
            <option :value="null">Choose Duration</option>
            <option
              v-for="option in ProjectSprintDurationOptions"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </FormValidator>
      </div>
    </div>

    <div class="form-group row mb-3">
      <div class="col-lg-6">
        <FormValidator
          label="Start Date"
          name="StartedAt"
        >
          <DatePicker
            v-model="project.startedAt"
            :enable-time-picker="false"
            :disabled="!writePermission"
            format="dd-MM-yyyy"
            modelType="dd-MM-yyyy"
          />
        </FormValidator>
      </div>

      <div class="col-lg-6">
        <FormValidator
          label="End Date"
          name="EndedAt"
        >
          <DatePicker
            v-model="project.endedAt"
            :enable-time-picker="false"
            :disabled="!writePermission"
            format="dd-MM-yyyy"
            modelType="dd-MM-yyyy"
          />
        </FormValidator>
      </div>
    </div>

    <button
      v-if="writePermission"
      type="button"
      class="btn btn-success waves-effect waves-light mt-2 me-1"
      @click="update"
    >
      <i class="bx bx-save me-2"></i> Update
    </button>

    <button
      v-if="deletePermission"
      type="button"
      class="btn btn-danger waves-effect waves-light mt-2 me-1 text-right"
      @click="deleteProject"
    >
      <i class="bx bx bx-trash-alt me-2"></i> Delete
    </button>

    <button
      v-b-tooltip.hover
      title="Upload Image"
      class="btn btn-light mr-2 mt-2"
      @click="onUploadModalShow()"
    >
      <i class="mdi mdi-upload"></i>
    </button>

    <b-modal
      id="modal-center"
      ref="modal"
      v-model="uploadModalShow"
      size="lg"
      title="Project Upload Image"
      title-class="font-18"
      hide-footer
    >
      <ProjectUploadImage v-model="project" />

      <div class="modal-footer pb-0">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
          @click="uploadModalShow = false"
        >
          Close
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="uploadImages"
        >
          Save
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script setup>
import { inject, ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { map } from "lodash";

import router from "@/router/index";
const route = useRoute();

import {
  FetchSelectOptions,
  UpdateProject,
  DeleteProject,
  UploadProjectImages,
} from "@/apis/repositories";

import { ProjectSprintDurationOptions } from "@/constants";
import { ProjectBasicInfoForm } from "@/formModels";

const projectId = route.params.id;
const project = defineModel();
const clientOptions = ref([]);

defineProps({
  writePermission: {
    type: Boolean,
    required: false,
  },

  deletePermission: {
    type: Boolean,
    required: false,
  },
});

onMounted(async () => {
  const result = await FetchSelectOptions(["client"]);

  if (result.SelectOptions) {
    clientOptions.value = result.SelectOptions.ClientOptions;
  }
});

const Swal = inject("Swal");
const uploadModalShow = ref(false);

function onUploadModalShow() {
  uploadModalShow.value = true;
}

async function update() {
  const form = new ProjectBasicInfoForm(project.value);

  const result = await UpdateProject(projectId, form);
  if (result) {
    project.value = result.ProjectUpdate.project;
  }
}

async function uploadImages() {
  let result = await UploadProjectImages(
    projectId,
    project.value.logo.key,
    map(project.value.files, "key"),
  );

  if (result) {
    const resultData = result.ProjectUploadImages.project;

    project.value.logoUrl = resultData.logo.url;
    project.value.logo = resultData.logo;
    project.value.files = resultData.files;
  }
}

async function deleteProject() {
  const confirmation = await Swal.fire({
    title: "Warning !",
    icon: "warning",
    html:
      `Are you sure want to delete <b> ${project.value.name} </b> ? ` +
      "<br/>" +
      "<div style='color: red'> Delete Project might cause losing all data on the project's issues and settings ! </div>" +
      `<b> Type in <span style='color: red'>${project.value.name}</span> into the input to verify your action</b>`,
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "OK",
    preConfirm: (projectName) => {
      if (projectName != project.value.name) {
        Swal.showValidationMessage("Request failed");
      }
    },
  });

  if (confirmation.isConfirmed) {
    const result = await DeleteProject(projectId);

    if (result) router.push("/projects");
  }
}
</script>
