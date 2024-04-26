<template>
  <div class="col-12 col-xl-4">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title mb-4 row">
          <div class="col title">Team Members</div>

          <div
            v-if="writePermission"
            class="col text-right"
          >
            <button
              type="button"
              class="btn btn-success"
              @click="openCreateModal()"
            >
              <i class="bx bx-user-plus font-size-20"></i>
            </button>
          </div>
        </h4>

        <b-modal
          ref="modal"
          size="lg"
          centered
          :title="`Project's Members ${form.id ? 'Update' : 'Create'}`"
          title-class="font-18"
          hide-footer
        >
          <ProjectAssigneeForm
            v-model="form"
            :title="form.id ? 'Edit Member' : 'New Member'"
            :write-permission="writePermission"
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
              v-if="writePermission"
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="submit"
            >
              Submit
            </button>
          </div>
        </b-modal>

        <table class="table align-middle table-nowrap">
          <tbody>
            <tr
              v-for="assignee in project.projectAssignees"
              :key="assignee.id"
              class="cursor-pointer"
              @click.stop.prevent="editProjectAssignee(assignee)"
            >
              <td style="width: 50px">
                <UserAvatar :user="assignee.user"></UserAvatar>
              </td>

              <td>
                <h5 class="font-size-14 m-0">
                  <a class="text-dark">{{ assignee.user.name }}</a>
                </h5>
              </td>

              <td>
                <BadgeLabel
                  :text="assignee.active ? 'Active' : 'Inactive'"
                  :color="assignee.active ? 'green' : 'gray'"
                  :extra-classes="['mr-1']"
                ></BadgeLabel>

                <BadgeLabel
                  v-if="assignee.title"
                  :text="assignee.title"
                  color="blue"
                ></BadgeLabel>
              </td>

              <td
                v-if="deletePermission"
                @click.stop.prevent="deleteProjectAssignee(assignee)"
              >
                <button
                  v-b-tooltip.hover
                  type="button"
                  class="btn btn-danger mr-1"
                  title="Delete"
                >
                  <i class="bx bx bx-trash label-icon"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed } from "vue";

import { cloneDeep } from "lodash";

import useModal from "@/composable/modal";
const { modal, showModal, hideModal } = useModal();

import { useRoute } from "vue-router";
const route = useRoute();
const projectId = route.params.id;

import { AddProjectAssigneeToProject } from "@/apis/repositories";

import { ProjectAssigneeForm as ProjectAssigneeFormModel } from "@/formModels";

// ===========PERMISSION========
const hasPermissionOn = inject("hasPermissionOn");

const writePermission = computed(() =>
  hasPermissionOn("project_assignees", "write"),
);

const deletePermission = computed(() =>
  hasPermissionOn("project_assignees", "delete"),
);

const form = ref({});

const project = defineModel();

const Swal = inject("Swal");

async function submit() {
  const formData = new ProjectAssigneeFormModel(form.value);

  await AddProjectAssigneeToProject(projectId, formData);
}

function editProjectAssignee(assignee) {
  form.value = cloneDeep(assignee);
  showModal();
}

function openCreateModal() {
  form.value = {};
  showModal();
}

async function deleteProjectAssignee(assignee) {
  const confirmation = await Swal.fire({
    title: "Notice !",
    icon: "warning",
    html: `Are you sure want to delete <b> ${assignee.name} </b> in project ? `,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  });

  if (confirmation.isConfirmed) {
    await projectAssigneeStore.deleteProjectAssignee(
      assignee.id,
      props.projectId,
    );
  }
}
</script>

<style lang="scss" scoped>
.card-title {
  align-items: center;
}
.table-nowrap td {
  vertical-align: middle;
  &:last-child {
    text-align: right;
  }
  @media (max-width: 1400px) {
    padding: 10px;
  }
}
</style>
