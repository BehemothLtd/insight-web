<template>
  <div class="row">
    <div class="d-flex mt-3">
      <button
        class="btn btn-success ms-auto"
        type="button"
        v-if="updating"
        @click="updateOrder"
      >
        <i class="bx bx-save me-2"></i> Update Order Of Issue Statuses
      </button>

      <button
        class="btn btn-primary ms-auto"
        type="button"
        @click="showModal"
      >
        <i class="bx bx-plus-circle me-2"></i> New project issue status
      </button>
    </div>

    <b-modal
      ref="modal"
      centered
      title="New project issue status"
      title-class="font-18"
      hide-footer
    >
      <FormValidator
        name="issue_status_id"
        label="Select issue status"
        required
      >
        <el-select-v2
          v-model="issueStatusId"
          class="w-100"
          :options="issueStatusOptions"
          filterable
        />
      </FormValidator>

      <div class="my-2 text-end">
        <router-link
          class="text-small text-muted my-2"
          to="/issue_statuses"
        >
          Go to issue statues manage</router-link
        >
      </div>
      <div class="modal-footer pb-0">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
          @click="hideModal"
        >
          Close
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="createNewProjectIssueStatus"
        >
          Save
        </button>
      </div>
    </b-modal>

    <div class="table-responsive">
      <table
        class="table table-hover project-list-table table-nowrap align-middle table-borderless"
      >
        <thead class="thead-light">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <draggable
          v-if="
            project.projectIssueStatuses && project.projectIssueStatuses.length
          "
          :list="project.projectIssueStatuses"
          item-key="title"
          tag="tbody"
          ghost-class="ghost"
          handle=".handle"
          @start="dragging = true"
          @end="dragging = false"
          @change="dragInput"
        >
          <template #item="{ element }">
            <tr>
              <td>
                <BadgeLabel
                  :text="element.issueStatus.title"
                  :extra-classes="['mt-1 p-2 text-capitalize']"
                  :color="element.issueStatus.color"
                ></BadgeLabel>
              </td>
              <td>
                <BadgeLabel
                  :text="element.issueStatus.statusType"
                  :extra-classes="['mt-1 ml-2 p-2 text-capitalize']"
                  :color="element.statusType == 'system' ? 'red' : 'green'"
                ></BadgeLabel>
              </td>
              <td>
                <a
                  href
                  @click.prevent=""
                >
                  <i class="fa fa-align-justify text-primary mr-3 handle"></i>
                </a>
                <a
                  href
                  class="text-danger"
                  @click.prevent="destroy(element)"
                >
                  <i class="bx bx bx-trash-alt me-2"></i>
                </a>
              </td>
            </tr>
          </template>
        </draggable>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { cloneDeep } from "lodash";
import { useRoute, useRouter } from "vue-router";

import useModal from "@/composable/modal";

const { modal, showModal, hideModal } = useModal();

const Swal = inject("Swal");

const updating = ref(false);
const newOrder = ref([]);
const issueStatusId = ref(null);
const issueStatusOptions = ref([]);

const project = defineModel();
import draggable from "vuedraggable";

onMounted(async () => {
  const result = await FetchSelectOptions("issueStatus");

  if (result.SelectOptions) {
    issueStatusOptions.value = result.SelectOptions.IssueStatusOptions;
  }
});

import {
  ProjectUpdateProjectIssueStatusOrder,
  ProjectDeleteProjectIssueStatus,
  ProjectCreateProjectIssueStatus,
  FetchSelectOptions,
} from "@/apis/repositories";

const route = useRoute();
const router = useRouter();

const dragInput = async (e) => {
  newOrder.value = [];

  const element = e.moved.element;
  const newIndex = e.moved.newIndex;
  let temp = cloneDeep(project.value.projectIssueStatuses);
  temp = temp.filter((i) => i.id != element.id);
  temp.splice(newIndex, 0, element);
  temp = temp.map((item, index) => {
    return { ...item, position: index + 1 };
  });

  updating.value = true;

  temp.forEach((item) => {
    newOrder.value.push(parseInt(item.id));
  });
};

async function updateOrder() {
  const confirmation = await Swal.fire({
    title: "Notice !",
    text: `Are you sure want change the order of Statuses in this Project ?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Submit",
    cancelButtonText: "Cancel",
  });

  if (confirmation.isConfirmed) {
    let result = await ProjectUpdateProjectIssueStatusOrder(
      project.value.id,
      newOrder.value,
    );

    if (result) {
      refreshPage();
    }
  }
}

async function destroy(projectIssueStatus) {
  const confirmation = await Swal.fire({
    title: "Notice !",
    html: `Do you want to delete project issue status: <b>${projectIssueStatus.issueStatus.title}</b>`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Submit",
    cancelButtonText: "Cancel",
  });

  if (confirmation) {
    const result = await ProjectDeleteProjectIssueStatus(
      project.value.id,
      projectIssueStatus.id,
    );

    if (result) {
      refreshPage();
    }
  }
}

async function createNewProjectIssueStatus() {
  const result = await ProjectCreateProjectIssueStatus(
    project.value.id,
    issueStatusId.value.toString(),
  );

  if (result) {
    hideModal();
    refreshPage();
  }
}

function refreshPage() {
  router.go(route.name);
}
</script>
