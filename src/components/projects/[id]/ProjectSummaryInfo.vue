<template>
  <div class="col-12 col-xl-8">
    <div class="card">
      <ProjectSummaryUpdate
        v-if="modifying"
        v-model="project"
        :write-permission="projectWritePermission"
        :delete-permission="projectDeletePermission"
      />

      <ProjectSummaryShow
        v-else
        v-model="project"
      />

      <div
        v-if="projectWritePermission || projectDeletePermission"
        class="card-footer"
      >
        <button
          type="button"
          class="btn btn-primary waves-effect waves-light mt-2 me-1"
          @click="modifying = !modifying"
        >
          <i class="bx bx-pencil me-2"></i>
          {{ modifying ? "Back" : "Modify" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed } from "vue";

const project = defineModel();

const modifying = ref(false);

// ===========PERMISSION========
const hasPermissionOn = inject("hasPermissionOn");

const projectWritePermission = computed(() =>
  hasPermissionOn("projects", "write"),
);

const projectDeletePermission = computed(() =>
  hasPermissionOn("projects", "delete"),
);
</script>

<style lang="scss" scoped>
.card {
  box-shadow: none;
  .card-footer {
    background-color: transparent;
  }
}
</style>
