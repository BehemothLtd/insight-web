<template>
  <div class="drag-container">
    <div class="actions">
      <button
        v-b-tooltip.hover
        title="Toggle filter"
        class="btn btn-light mr-2"
        @click="showFilters = !showFilters"
      >
        <i class="mdi mdi-filter"></i>
      </button>
      <button
        v-b-tooltip.hover
        title="Refresh board"
        class="btn btn-light"
        @click="refreshBoard"
      >
        <i class="mdi mdi-refresh"></i>
      </button>
    </div>

    <div
      v-dragscroll:nochilddrag
      class="drag-list cursor-pointer"
    >
      <div
        v-for="element in projectBoardData"
        :key="element.issueStatus.id"
        class="drag-column"
      >
        <div class="card col-card h-100 board-column">
          <div class="card-body d-flex flex-column px-2 pb-0">
            <div class="colum-header">
              <b-dropdown
                variant="white"
                class="float-right"
                toggle-class="p-0"
                dropstart
              >
                <template #button-content>
                  <i class="fas fa-ellipsis-v"></i>
                </template>

                <b-dropdown-item> Create new issue </b-dropdown-item>

                <b-dropdown-item>
                  <span class="text-danger"> Delete </span>
                </b-dropdown-item>
              </b-dropdown>

              <span class="drag-column-header">
                <h4 class="card-title mb-4 pb-1">
                  {{ element.issueStatus.title }}
                </h4>
              </span>
            </div>

            <TaskGroup
              :tasks="element.issues"
              :status-id="element.issueStatus.id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const project = defineModel();

const projectBoardData = ref([]);

import { FetchProjectBoardData } from "@/apis/repositories";

onMounted(() => {
  FetchProjectBoardData(project.value.id).then((result) => {
    projectBoardData.value = result.ProjectBoard;
  });
});
</script>

<style lang="scss" scoped>
.drag-list {
  width: 100%;
  min-height: calc(100vh - 370px);
  display: flex;
  overflow: auto;
}

.drag-column {
  min-width: 300px;
  margin: 15px 5px;
  flex: 1 1 0;
}

:deep(.dropdown-toggle::after) {
  display: none;
}

:deep(.col-card) {
  background-color: #eaecf0;
}
.create-issue-btn:hover {
  transition: 0.3s;
  color: #556ee6;
}
.actions {
  display: inline;
  position: absolute;
  right: 20px;
  top: 85px;
  text-align: right !important;
}
</style>
