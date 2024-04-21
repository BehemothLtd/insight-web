<template>
  <img
    class="rounded-circle avatar-sm"
    :src="project.logoUrl"
    v-if="project.logoUrl"
  />
  <div
    class="default-avatar"
    v-else
  >
    {{ project.code }}
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.default-avatar {
  width: 6rem;
  height: 4rem;
  background-color: lightgray;
  color: white;
  border-style: solid;
  font-size: 12px;
  text-align: center;
  vertical-align: middle;
  line-height: 3.8rem;
}
</style>
