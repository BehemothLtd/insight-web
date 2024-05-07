<template>
  <div class="text-truncate mb-1 issue-title">
    <IssueTypeBadge :issue-type="issue.issueType" />
    {{
      titleLength ? filters.truncateText(issue.title, titleLength) : issue.title
    }}
  </div>
</template>

<script setup>
defineProps({
  issue: {
    type: Object,
    required: true,
  },
  titleLength: {
    type: Number,
    required: false,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
.issue-title {
  max-width: 100vh;
  font-weight: 500;
  font-size: 14px;
}
</style>
