<template>
  <b-modal
    v-model="issueModal"
    size="xl"
    centered
    scrollable
    no-close-on-backdrop
    no-close-on-esc
    class="issue-modal"
    @hidden="$emit('close')"
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
