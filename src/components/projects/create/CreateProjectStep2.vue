<template>
  <div>
    <slot> </slot>
    <div class="form-group">
      <FormValidator
        label="Project Type"
        name="project_type"
        required
      >
        <el-select-v2
          v-model="project.projectType"
          class="w-100"
          :options="ProjectTypeOptions"
          filterable
        />
      </FormValidator>

      <FormValidator
        v-if="project.projectType == 'scrum'"
        class="mt-3"
        label="Sprint Duration"
        name="sprint_duration"
        required
      >
        <el-select-v2
          v-model="project.sprintDuration"
          class="w-100"
          :options="ProjectSprintDurationOptions"
          filterable
        />
      </FormValidator>
    </div>

    <FormValidator
      name="project_issue_statuses_attributes"
      label="Project Statuses"
    >
      <div class="custom-checkbox">
        <div
          v-for="status in issueStatusOptions"
          :key="status.value"
        >
          <input
            :id="`issueStatus_${status.value}`"
            v-model="project.projectIssueStatusesAttributes"
            class="form-check-input"
            type="checkbox"
            :value="{ issueStatusId: status.value }"
            style="display: none"
          />
          <label
            :for="`issueStatus_${status.value}`"
            class="status-label"
            :style="activeStyles(status.value)"
          >
            <i
              v-show="checked(status.value)"
              class="bx bx-check"
            ></i>
            {{ status.label }}
          </label>
        </div>
      </div>
    </FormValidator>
  </div>
</template>

<script setup>
import { computed } from "vue";

import { ProjectTypeOptions, ProjectSprintDurationOptions } from "@/constants";

defineProps({
  issueStatusOptions: {
    type: Array,
    required: true,
  },
});

const project = defineModel();

const activeStyles = computed(() => {
  return (id) => {
    if (
      project.value.projectIssueStatusesAttributes &&
      project.value.projectIssueStatusesAttributes.length
    ) {
      const active = project.value.projectIssueStatusesAttributes.some(
        (item) => item.issueStatusId === id,
      );
      if (active) {
        const issueStatus = selectOptions.value.issueStatuses.find(
          (e) => e.value === id,
        );
        if (issueStatus) {
          const issueStatusColor = issueStatus.color;
          const styles = {
            border: `2px solid ${issueStatusColor}`,
            color: `${issueStatusColor}`,
          };
          return styles;
        }
      }
    }
    return null;
  };
});

function checked(id) {
  if (
    project.value.projectIssueStatusesAttributes &&
    project.value.projectIssueStatusesAttributes.length
  ) {
    return project.value.projectIssueStatusesAttributes.some(
      (item) => item.issueStatusId === id,
    );
  }
  return false;
}
</script>

<style lang="scss" scoped>
.custom-checkbox {
  display: flex;
  padding: 0;
  gap: 10px;
  flex-wrap: wrap;
  .status-label {
    padding: 5px 8px;
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
    color: #49505780;
    border: 1px solid #ced4da;
  }
}
</style>
