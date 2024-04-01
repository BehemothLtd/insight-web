<template>
  <div class="card mini-stats-wid">
    <div class="card-body">
      <div class="d-flex">
        <div class="flex-grow-1">
          <p class="text-muted fw-medium">
            {{ label }}
          </p>
          <h4 class="mb-0">
            {{ filters.numberFormat(value) }}
          </h4>
        </div>

        <div class="flex-shrink-0 align-self-center">
          <div class="mini-stat-icon avatar-sm rounded-circle bg-primary">
            <span class="avatar-title">
              <i
                class="bx font-size-24"
                :class="icon"
              ></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: "",
  },
  value: {
    type: [Number, String],
    default: "",
  },
  icon: {
    type: [String],
    default: "bx-copy-alt",
  },
});
</script>
