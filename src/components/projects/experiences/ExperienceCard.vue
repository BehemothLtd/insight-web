<template>
  <div class="col-md-4 col-sm-6">
    <div class="card project-card-item">
      <div
        v-if="experience"
        class="card-body"
      >
        <div>
          <div class="d-flex justify-content-between w-100">
            <div class="d-flex gap-15">
              <div>
                <h5 class="text-truncate font-size-15">
                  {{ experience.title }}
                </h5>
              </div>
            </div>
            <div>
              <button
                class="btn mr-2"
                :disabled="!writePermission"
              >
                <i
                  v-b-tooltip.hover
                  class="mdi mdi-pencil font-size-18 text-success cursor-pointer"
                  title="Edit"
                  @click="$emit('detail', experienceId)"
                ></i>
              </button>
              <button
                class="btn"
                :disabled="!writePermission"
              >
                <i
                  v-b-tooltip.hover
                  class="mdi mdi-delete font-size-18 text-danger cursor-pointer"
                  title="Delete"
                  @click="$emit('delete', experienceId)"
                ></i>
              </button>
            </div>
          </div>

          <div class="d-flex justify-content-start w-100">
            <!-- <BadgeLabel
              v-if="!projectId"
              :text="experience.project.name"
              :extra-classes="['mt-1  p-2 text-capitalize mr-2']"
              color="pink"
            ></BadgeLabel> -->

            <BadgeLabel
              :text="filters.fullDateTime(experience.createdAt)"
              :extra-classes="['mt-1  p-2 text-capitalize']"
              color="green"
            ></BadgeLabel>
          </div>

          <div class="text-muted mb-4 exp-description">
            {{ experience.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  experience: {
    type: Object,
    default: () => {},
  },
  writePermission: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["detail", "delete"]);

const experienceId = computed(() => props.experience.id);
</script>

<style lang="scss" scoped>
.exp-description {
  margin-top: 10px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
.btn {
  padding: unset;
}
</style>
