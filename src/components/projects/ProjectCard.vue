<template>
  <div class="col-md-4 col-sm-6">
    <router-link :to="`/projects/${project.id}`">
      <div class="card project-card-item">
        <div class="card-body">
          <div class="d-flex justify-content-between w-100">
            <div class="d-flex gap-15">
              <div class="avatar-lg text-center">
                <ProjectAvatar
                  v-if="project"
                  :project="project"
                />
              </div>
              <div>
                <h5 class="text-truncate font-size-15">
                  {{ project.name }}
                </h5>
                <BadgeLabel
                  v-if="project.projectType"
                  :text="project.projectType"
                  :extra-classes="['mt-1 p-2 text-capitalize']"
                  color="pink"
                ></BadgeLabel>

                <BadgeLabel
                  v-if="project.projectPriority"
                  :text="project.projectPriority"
                  :extra-classes="['mt-1 ml-2 p-2 text-capitalize']"
                  :color="projectPriorityColor"
                ></BadgeLabel>

                <BadgeLabel
                  v-if="project.state"
                  :text="project.state"
                  :extra-classes="['mt-1 ml-2 p-2 text-capitalize']"
                  :color="project.state == 'active' ? 'green' : 'gray'"
                ></BadgeLabel>
              </div>
            </div>
            <div @click.prevent="$emit('pinProject', project.id)">
              <i
                :class="pinIconClass"
                class="font-size-24 align-middle me-2"
              ></i>
            </div>
          </div>
          <p class="text-muted mb-4 project-description">
            {{ project.description }}
          </p>
          <div class="pt-3 border-top">
            <ul
              class="list-inline mb-0 d-flex align-items-center justify-content-between"
            >
              <li class="list-inline-item">
                <div class="d-flex">
                  <div
                    v-if="project.startedAt"
                    v-b-tooltip.hover
                    title="Started at"
                  >
                    <i class="bx bx bx-calendar-check"></i>
                    {{ filters.fullDate(project.startedAt) }}
                  </div>
                  <div
                    v-if="project.state == 'inactive'"
                    v-b-tooltip.hover
                    title="Inactivated at"
                  >
                    &nbsp;~
                    <i class="bx bx-calendar-x"></i>
                    {{ filters.fullDate(project.inactivedAt) }}
                  </div>
                </div>
              </li>
              <li class="list-inline-item">
                <ProjectMembers :project="project"></ProjectMembers>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  project: {
    type: Object,
    default: () => {},
  },
});

const projectPriorityColor = ref("");

const pinIconClass = computed(() => {
  return props.project.pinned ? "bx bxs-bookmark" : "bx bx-bookmark";
});

watch(
  () => props.project,
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

<style lang="scss" scoped>
.project-card-item {
  min-height: 255px;

  .project-description {
    min-height: 60px;
  }

  .avatar-lg {
    height: 5rem;
  }

  .border-top {
    border-top: 1px solid #556ee6 !important;
  }

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }

  .gap-15 {
    gap: 15px;
  }

  .project-description {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
