<template>
  <div class="row">
    <div class="issue-left-panel col-xl-8">
      <div class="card">
        <div class="card-body">
          <form class="outer-repeater">
            <div
              data-repeater-list="outer-group"
              class="outer"
            >
              <div
                data-repeater-item
                class="outer"
              >
                <div class="form-group row mb-4">
                  <div class="col-lg-12">
                    <FormValidator
                      name="Title"
                      label="Title"
                      required
                    >
                      <input
                        v-model="issue.title"
                        class="form-control"
                        type="text"
                        placeholder="Enter Task Name..."
                      />
                    </FormValidator>
                  </div>
                </div>

                <div class="form-group row mb-4">
                  <div class="col-lg-12">
                    <FormValidator
                      name="Description"
                      label="Description"
                      required
                    >
                      <MarkdownEditor
                        :editor-id="`issue-editor`"
                        v-model="issue.description"
                        v-if="viewMode == 'edit'"
                        ref="descriptionRef"
                      />

                      <MdPreview
                        v-model="issue.description"
                        class="border-preview"
                        v-if="viewMode == 'view'"
                        @click="viewMode = 'edit'"
                        style="cursor: pointer"
                      />
                    </FormValidator>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="card issue-right-panel col-xl-4">
      <section class="issue-function">
        <div>
          <div
            class="container p-0 mb-2 cursor-pointer collapse-panel"
            @click="rightPanelToggle = true"
          >
            <div class="flexwrap">
              <span class="mdi mdi-arrow-collapse-right"></span>
            </div>
          </div>

          <FormValidator
            class="mb-3"
            name="ProjectSprintId"
            label="Project Sprint"
            v-if="project.projectType == 'scrum'"
          >
            <el-select-v2
              v-model="issue.projectSprintId"
              class="w-100"
              :options="sprintOptions"
              filterable
              clearable
            />
          </FormValidator>

          <FormValidator
            class="mb-3"
            name="issueType"
            label="Issue Type"
            required
          >
            <el-select-v2
              v-model="issue.issueType"
              class="w-100"
              :options="issueTypeOptions"
              filterable
              clearable
            />
          </FormValidator>

          <FormValidator
            class="mb-3"
            name="Priority"
            label="Priority"
            required
          >
            <el-select-v2
              v-model="issue.priority"
              class="w-100"
              :options="issuePriorityOptions"
              filterable
              clearable
            />
          </FormValidator>

          <FormValidator
            class="mb-3"
            name="IssueStatusId"
            label="Status"
            required
          >
            <el-select-v2
              v-model="issue.issueStatusId"
              :options="issueStatusOptions"
              class="w-100"
              filterable
              clearable
            />
          </FormValidator>

          <FormValidator
            class="mb-3"
            name="ParentId"
            label="Link Issues"
          >
            <el-select-v2
              v-model="issue.parentId"
              class="w-100"
              :options="issueOptions"
              filterable
              clearable
            />
          </FormValidator>

          <div class="form-group row mb-3">
            <div class="col-lg-6">
              <FormValidator
                label="Start date"
                name="StartDate"
              >
                <DatePicker
                  v-model="issue.startDate"
                  :enable-time-picker="false"
                  model-type="dd/MM/yyyy"
                  format="dd/MM/yyyy"
                  auto-apply
                />
              </FormValidator>
            </div>

            <div class="col-lg-6">
              <FormValidator
                label="Deadline"
                name="Deadline"
              >
                <DatePicker
                  v-model="issue.deadline"
                  :enable-time-picker="false"
                  model-type="dd/MM/yyyy"
                  format="dd/MM/yyyy"
                  auto-apply
                />
              </FormValidator>
            </div>
          </div>
        </div>
        <div class="inner-repeater mb-4">
          <div>
            <label>Assign User</label>
            <table class="table b-table">
              <thead>
                <tr class="thead-light">
                  <th width="45%">User</th>
                  <th width="45%">Role</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(assignee, index) in issue.issueAssignees"
                  :key="assignee.id"
                >
                  <td>
                    <FormValidator
                      :name="`IssueAssignees.${index}.UserId`"
                      required
                    >
                      <el-select-v2
                        v-model="assignee.userId"
                        :options="projectAssigneeOptions"
                        class="w-100"
                        filterable
                        clearable
                      />
                    </FormValidator>
                  </td>

                  <td>
                    <FormValidator
                      :name="`IssueAssignees.${index}.DevelopmentRoleId`"
                      required
                    >
                      <el-select-v2
                        v-model="assignee.developmentRoleId"
                        filterable
                        clearable
                        :options="developmentRoleOptions"
                      />
                    </FormValidator>
                  </td>
                  <td>
                    <i
                      class="mdi mdi-delete ml-2 text-danger"
                      style="font-size: 24px; float: left; cursor: pointer"
                      @click="deleteAssignee(assignee)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <i
              class="btn btn-secondary mdi mdi-account-multiple-plus"
              style="font-size: 15px; float: left; cursor: pointer"
              @click="addAssignee"
            />
          </div>
        </div>
      </section>

      <section class="issue-function-hidden">
        <div
          class="container p-0 mb-2 cursor-pointer"
          @click="rightPanelToggle = false"
        >
          <div class="flexwrap">
            <span class="mdi mdi-arrow-collapse-left"></span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";

// =============COMPONENT==========
import MarkdownEditor from "@/components/molecules/common/MarkdownEditor.vue";
import { MdPreview } from "md-editor-v3";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const issue = defineModel();

import { FetchProjectSprints } from "@/apis/repositories";

const sprintOptions = ref([]);

import useSelectOptions from "@/composable/useSelectOptions";

const {
  issueTypeOptions,
  issuePriorityOptions,
  issueOptions,
  issueStatusOptions,
  projectAssigneeOptions,
  developmentRoleOptions,
  fetchSelectOptions,
} = useSelectOptions();

const viewMode = ref("view");

onMounted(() => {
  fetchSelectOptions(
    [
      "issueType",
      "issuePriority",
      "projectIssue",
      "projectIssueStatus",
      "projectAssignee",
      "developmentRole",
    ],
    {
      projectId: props.project.id,
    },
  );

  if (props.project.projectType == "scrum") {
    FetchProjectSprints(props.project.id).then((result) => {
      result.ProjectSprints.forEach((sprint) => {
        sprintOptions.value.push({
          label: sprint.title,
          value: sprint.id,
        });
      });
    });
  }
});

function deleteAssignee(assignee) {
  issue.value.issueAssignees = issue.value.issueAssignees.filter(
    (i) =>
      !(
        i.userId == assignee.userId &&
        i.developmentRoleId == assignee.developmentRoleId
      ),
  );
}

function addAssignee() {
  issue.value.issueAssignees.push({
    userId: null,
    developmentRoleId: null,
  });
}

const descriptionRef = ref(null);

onClickOutside(descriptionRef, (_) => (viewMode.value = "view"));
</script>

<style lang="scss" scoped>
.border-preview {
  border: 1px solid var(--el-border-color);
  height: 700px;
}

:deep(.md-editor-preview) {
  word-break: break-word;
  overflow-wrap: anywhere;
}

@media (min-width: 1200px) {
  .issue-right-panel-toggle {
    .issue-left-panel {
      width: 95% !important;
    }

    .issue-right-panel {
      width: 5% !important;

      .issue-function {
        display: none;
      }

      .issue-function-hidden {
        display: block;
        text-align: center;

        .mdi-arrow-collapse-left {
          color: green !important;
          font-size: 24px;
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .toggle-arrow {
    display: none;
  }
}

.mdi-arrow-collapse-right {
  color: green !important;
  font-size: 24px;
}

.issue-function-hidden {
  display: none;
}
</style>
