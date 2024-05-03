<template>
  <div>
    <div class="d-flex flex-nowrap text-capitalize">
      <BadgeLabel
        v-if="showingCondition.code"
        :extra-classes="['mt-1']"
        :text="issue.code"
        icon="bx bx-purchase-tag-alt"
      ></BadgeLabel>

      <BadgeLabel
        v-if="showingCondition.status"
        :text="issue.status"
        icon="bx bx-check-circle"
        :extra-classes="['mt-1 ml-1']"
        :color="issue.statusColorCode"
      ></BadgeLabel>

      <BadgeLabel
        v-if="showingCondition.priority"
        :text="issue.priority"
        icon="bx bx-stats"
        :extra-classes="['mt-1 ml-1']"
        :color="issue.colorCode"
      ></BadgeLabel>

      <BadgeLabel
        v-if="issue.deadline && showingCondition.deadline"
        :text="filters.fullDate(issue.deadline)"
        icon="bx bx-time-five"
        :extra-classes="['d-block mt-1 ml-1']"
        color="#960909"
      ></BadgeLabel>
    </div>

    <BadgeLabel
      v-if="issue.parent && showingCondition.parent"
      :text="issue.parent.title"
      icon="bx bx-link"
      color="#606cf7"
      @click.stop.prevent="
        openParentIssueInNewTab(issue.projectId, issue.parent.id)
      "
    ></BadgeLabel>
  </div>
</template>

<script setup>
const props = defineProps({
  issue: {
    type: Object,
    required: true,
  },
  showing: {
    type: Object,
    required: false,
    default: {},
  },
});

function openParentIssueInNewTab(projectId, parentIssueId) {
  window.open(`/projects/${projectId}?issueId=${parentIssueId}`);
}

const showingCondition = {
  ...{
    code: true,
    status: true,
    priority: true,
    deadline: true,
    parent: true,
  },
  ...props.showing,
};
</script>
