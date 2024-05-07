<template>
  <b-card
    no-body
    class="mb-3 mt-3"
  >
    <b-card-header
      header-tag="header"
      class="p-0"
      role="tab"
    >
      <div
        class="sprint-header"
        :aria-expanded="visible ? true : false"
        :aria-controls="`accordion-${sprint.id}`"
        variant="success"
        @click.prevent="toggleVisible"
      >
        <div class="d-flex algin-items-center">
          <Transition name="fade">
            <a class="header-icon mr-2">
              <i
                v-if="projectSprintLoading"
                class="bx bx-revision bx-spin"
              ></i>
              <template v-else>
                <i
                  v-if="visible"
                  class="bx bx-chevron-down font-size-20"
                ></i>
                <i
                  v-else
                  class="bx bx-chevron-right font-size-20"
                ></i>
              </template>
            </a>
          </Transition>

          {{ sprint.title }}
        </div>
        <div class="d-flex align-items-center justify-content-end">
          <span
            v-if="sprint.active"
            class="badge badge-success"
          >
            Active
          </span>
        </div>
      </div>
    </b-card-header>

    <b-collapse
      :id="`accordion-${sprint.id}`"
      v-model="visible"
      role="tabpanel"
    >
      <b-card-body class="p-1">
        <div class="d-flex my-2">
          <div class="col">
            <p class="text-muted mb-0">
              <b>{{ metadata ? metadata.total : 0 }}</b>
              issues
            </p>
          </div>
        </div>
        <div class="table-responsive table-content">
          <table class="table table-nowrap align-middle mb-0">
            <tbody id="active-issue-list">
              <IssueBasicRow
                v-for="issue in issues"
                :key="issue.id"
                :issue="issue"
                :sprint-id="sprint.id"
                :draggable="writePermission"
              >
              </IssueBasicRow>

              <Pagination
                :meta="metadata"
                @change="onPageChange"
              ></Pagination>
            </tbody>
          </table>
        </div>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useGoQuery } from "@bachdx/b-vuse";

import { FetchProjectIssuesList } from "@/apis/repositories";

const props = defineProps({
  sprint: {
    type: Object,
    required: true,
  },
  writePermission: {
    type: Boolean,
    required: true,
  },
});

const visible = ref(false);
const projectSprintLoading = ref(false);
const query = ref({ projectSprintIdEq: props.sprint.id });

const { goQueryInput, updatePage, updateQuery } = useGoQuery({
  perPage: 10,
  query: query,
});

const issues = ref([]);
const metadata = ref({});

onMounted(async () => {
  if (props.sprint.active) {
    visible.value = true;
  }
});

watch(visible, async (val) => {
  if (val) {
    fetchIssuesList();
  }
});

function onPageChange(page) {
  updatePage(page);
  fetchIssuesList();
}

async function fetchIssuesList() {
  const result = await FetchProjectIssuesList(
    props.sprint.projectId,
    goQueryInput.pagyInput,
    goQueryInput.query,
  );

  if (result) {
    issues.value = result.ProjectIssues.collection;
    metadata.value = result.ProjectIssues.metadata;
  }
}

function toggleVisible() {
  visible.value = !visible.value;
}
</script>

<style scoped lang="scss">
.header-icon {
  width: 20px;
  text-align: center;
}

.sprint-card {
  border-radius: 5px !important;
  border: 1px solid #dddddd7c;
}

.sprint-header {
  display: flex;
  justify-content: space-between;
  height: 40px;
  background-color: #dddddd7c;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.sprint-header:hover {
  background-color: #ddddddab;
}
</style>
