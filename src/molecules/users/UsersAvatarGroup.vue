<template>
  <div
    class="avatar-group"
    :class="{ 'd-flex flex-nowrap': oneLine }"
  >
    <div
      v-for="user in availableUsers"
      :key="user.id"
      class="avatar-group-item"
    >
      <a class="d-inline-block">
        <UserAvatar :user="user"></UserAvatar>
      </a>
    </div>
    <div
      v-if="expandUsernames"
      class="avatar-group-item"
    >
      <a class="d-inline-block">
        <div class="position-relative">
          <img
            v-b-tooltip.hover
            class="rounded-circle position-relative avatar-xs"
            src="@/assets/images/three-dot.svg"
            alt
            :title="expandUsernames"
          />
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { uniqWith, isEqual } from "lodash";

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
  oneLine: {
    type: Boolean,
    default: false,
  },
  max: {
    type: Number,
    required: false,
    default: 0,
  },
});

const users = computed(() => uniqWith(props.users, isEqual));

const availableUsers = computed(() => {
  if (!props.max || props.max >= users.value.length) return users.value;

  return users.value.slice(0, props.max);
});

const expandUsernames = computed(() => {
  if (!props.max || props.max >= users.value.length) return;

  return users.value
    .slice(props.max, users.value.length)
    .map((i) => i.name)
    .join(", ");
});
</script>
