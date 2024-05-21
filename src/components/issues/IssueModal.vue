<template>
  <b-modal
    v-model="issueModal"
    size="xl"
    centered
    scrollable
    no-close-on-backdrop
    no-close-on-esc
    class="issue-modal"
    @keyup.esc=""
  >
    <template #header>
      <h5 class="modal-title font-18 d-flex align-items-center gap-2">
        {{ modalTitle }}
      </h5>
    </template>

    <IssueForm
      v-model="issue"
      :project="project"
      v-if="issueModal"
    />

    <template #footer>
      <div class="modal-footer pb-0 border-0">
        <button
          type="button"
          class="btn btn-danger"
        >
          Delete
        </button>

        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
          @click="issueModalStore.hideIssueModal"
        >
          Cancel
        </button>

        <button
          type="button"
          class="btn btn-primary"
          @click="handleClick"
        >
          Save
        </button>
      </div>
    </template>
  </b-modal>
</template>

<script setup>
import { storeToRefs } from "pinia";

import { useIssueModalStore } from "@/stores/issueModal";
const issueModalStore = useIssueModalStore();

defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const { issue, modalTitle, issueModal } = storeToRefs(issueModalStore);
</script>
