<template>
  <div class="card-body">
    <div class="d-flex">
      <div class="flex-shrink-0 me-4">
        <ProjectAvatar
          v-if="project"
          :project="project"
        />
      </div>

      <div class="flex-grow-1 overflow-hidden">
        <h5 class="text-truncate font-size-15">
          {{ project.name }}
        </h5>

        <p>
          <BadgeLabel
            v-if="project.state"
            :text="project.state"
            :extra-classes="['mt-1 p-2 text-capitalize']"
            :color="project.state == 'active' ? 'green' : 'gray'"
          ></BadgeLabel>

          <BadgeLabel
            v-if="project.projectType"
            :text="project.projectType"
            :extra-classes="['mt-1 ml-2 p-2 text-capitalize']"
            color="pink"
          ></BadgeLabel>

          <BadgeLabel
            v-if="project.projectPriority"
            :text="project.projectPriority"
            :extra-classes="['mt-1 ml-2 p-2 text-capitalize']"
            :color="projectPriorityColor"
          ></BadgeLabel>
        </p>
      </div>
    </div>

    <h5 class="font-size-15 mt-4">Project Details</h5>

    <p class="text-muted">
      {{ project.description }}
    </p>

    <h5 class="font-size-15 mt-4">Client</h5>

    <p
      v-if="project.client"
      class="text-muted"
    >
      {{ project.client.name }}
    </p>

    <div class="row">
      <div
        v-if="project.state == 'active'"
        class="col-md-6"
      >
        <h5 class="font-size-15 mt-4">Project Actived</h5>

        <p class="text-muted">
          {{ filters.fullDate(project.activedAt) }}
        </p>
      </div>

      <div
        v-else
        class="col-md-6"
      >
        <h5 class="font-size-15 mt-4">Project Inactived At</h5>

        <p class="text-muted">
          {{ filters.fullDate(project.inactivedAt) }}
        </p>
      </div>
    </div>

    <template v-if="project.projectType == 'scrum'">
      <h5 class="font-size-15 mt-4">Sprint Duration</h5>
      <p class="text-muted">{{ project.sprintDuration }} Weeks</p>

      <h5 class="font-size-15 mt-4">Current Sprint</h5>
      <p
        v-if="project.currentSprint"
        class="text-muted"
      >
        {{ project.currentSprint.title }}
      </p>
      <p
        v-else
        class="text-muted"
      >
        None
      </p>
    </template>

    <div class="row task-dates">
      <div class="col-sm-4 col-6">
        <div class="mt-4">
          <h5 class="font-size-14">
            <i class="bx bx-calendar me-1 text-primary"></i>Start Date
          </h5>
          <p class="text-muted mb-0">
            {{ filters.fullDate(project.startedAt) }}
          </p>
        </div>
      </div>

      <div class="col-sm-4 col-6">
        <div class="mt-4">
          <h5 class="font-size-14">
            <i class="bx bx-calendar me-1 text-primary"></i>End Date
          </h5>
          <p class="text-muted mb-0">
            {{ filters.fullDate(project.endedAt) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const project = defineModel();

const projectPriorityColor = ref("");

watch(
  () => project,
  async (value) => {
    if (value.projectPriority) {
      switch (value.projectPriority) {
        case "low":
          projectPriorityColor.value = "#f0cd6c";
          break;
        case "medium":
          projectPriorityColor.value = "#98d0f5";
          break;
        case "high":
          projectPriorityColor.value = "#f25771";
          break;
        default:
          break;
      }
    }
  },
  {
    immediate: true,
  },
);
</script>
