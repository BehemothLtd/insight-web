<template>
  <div class="row mb-3">
    <div class="text-right">
      <b-button-group class="mr-2">
        <b-button
          v-for="item in availableViewMode"
          :key="item"
          variant="outline-primary"
          :class="{ active: viewMode == item }"
          @click="viewMode = item"
        >
          <i
            v-if="item == 'grid'"
            class="bx bx-grid"
          ></i>
          <i
            v-else
            class="bx bx-list-ol"
          ></i>
        </b-button>
      </b-button-group>

      <router-link
        v-if="writePermission"
        to="/projects/new"
      >
        <button
          type="button"
          class="btn btn-primary waves-effect waves-light"
        >
          <i class="bx bx-plus-circle font-size-16 align-middle"></i>
          New
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from "vue";

const viewMode = defineModel();
const availableViewMode = ["grid", "list"];

// ===========PERMISSION========
const hasPermissionOn = inject("hasPermissionOn");

const writePermission = computed(() => hasPermissionOn("projects", "write"));
</script>

<style scoped>
.active {
  background-color: #556ee6 !important;
  border-color: #556ee6 !important;
}
</style>
