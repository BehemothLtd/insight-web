<template>
  <div>
    <slot> </slot>
    <div class="form-group">
      <FormValidator
        label="Project Type"
        name="projectType"
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
        name="sprintDuration"
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
      name="projectIssueStatuses"
      label="Project Statuses"
    >
      <div class="custom-checkbox">
        <div
          v-for="status in issueStatusOptions"
          :key="status.value"
        >
          <input
            :id="`issueStatus_${status.value}`"
            v-model="project.projectIssueStatuses"
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

const props = defineProps({
  issueStatusOptions: {
    type: Array,
    required: true,
  },
});

const project = defineModel();

const activeStyles = computed(() => {
  return (id) => {
    if (project.value.projectIssueStatuses.length) {
      const active = project.value.projectIssueStatuses.some(
        (item) => item.issueStatusId === id,
      );
      if (active) {
        const issueStatus = props.issueStatusOptions.find(
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
  if (project.value.projectIssueStatuses.length) {
    return project.value.projectIssueStatuses.some(
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
