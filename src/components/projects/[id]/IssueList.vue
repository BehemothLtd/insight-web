<template>
  <div class="col-lg-12 mt-2">
    <div>
      <table
        class="table table-hover project-list-table table-nowrap align-middle table-borderless"
      >
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Assignee</th>
            <th scope="col">Reporter</th>
          </tr>
        </thead>
        <tbody
          id="inactive-issue-list"
          :class="{ dragging: isDraggingIssue }"
        >
          <IssueBasicRow
            v-if="issues.length"
            v-for="issue in issues"
            :key="issue.id"
            :draggable="draggable"
            :issue="issue"
            :title-length="titleLength"
            @click="editIssue(issue)"
          >
          </IssueBasicRow>
          <tr v-else>
            <td
              colspan="3"
              class="text-center"
            >
              No issue to display
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useProjectIssueStore } from "@/stores/projectIssue";

const projectIssueStore = useProjectIssueStore();
const { isDraggingIssue } = storeToRefs(projectIssueStore);

import { useRoute, useRouter } from "vue-router";

import { useIssueModalStore } from "@/stores/issueModal";
const issueModalStore = useIssueModalStore();

// ================PROPS===============
defineProps({
  issues: {
    type: Array,
    default: () => [],
  },

  page: {
    type: Number,
    default: 1,
  },

  perPage: {
    type: Number,
    default: 10,
  },

  draggable: {
    type: Boolean,
    default: false,
  },

  titleLength: {
    type: Number,
    required: false,
    default: null,
  },
});

const route = useRoute();
const router = useRouter();

const projectId = route.params.id;

async function editIssue(issue) {
  router.push({ query: { issueId: issue.id }, hash: route.hash });

  await issueModalStore.editIssue(projectId, issue.id);
}
</script>

<style lang="scss" scoped>
table {
  thead {
    tr {
      th {
        background-color: #e0f2f8;
      }
    }
  }
  tbody {
    tr:nth-child(odd) {
      background-color: #f4f4f4;
    }
  }
}
</style>
