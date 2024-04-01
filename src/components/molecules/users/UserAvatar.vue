<template>
  <component
    :is="hasSlot ? 'div' : 'span'"
    :class="{ 'position-relative': hasSlot }"
  >
    <img
      v-if="user.avatarUrl"
      class="rounded-circle position-relative avatar"
      :class="avatarSize"
      v-b-tooltip.hover
      :title="user.name"
      :src="user.avatarUrl"
      alt
    />
    <div
      class="default-avatar"
      v-b-tooltip.hover
      :title="user.name"
      :class="avatarSize"
      v-else
    >
      {{ user.name }}
    </div>
    <slot> </slot>
  </component>
</template>

<script setup>
import { useSlots } from "vue";

defineProps({
  user: {
    type: Object,
    required: true,
  },
  avatarSize: {
    type: String,
    default: "avatar-xs",
  },
});

const slots = useSlots();
const hasSlot = !!slots["default"];
</script>

<style lang="scss" scoped>
.header-profile-user {
  object-fit: cover;
}

.avatar-lg {
  object-fit: cover;
  font-size: 10px;
  line-height: 5.8rem;
}

.avatar-xs {
  object-fit: cover;
  font-size: 5px;
  line-height: 1.8rem;
}

.avatar-sm {
  object-fit: cover;
  font-size: 5px;
  width: 1.5rem;
  height: 1.5rem;
}

.default-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  object-fit: cover;
  background-color: lightgray;
  color: white;
  border-radius: 50%;
  border-style: solid;
  &.avatar-general {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
  }
}
</style>
