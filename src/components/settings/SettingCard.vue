<template>
  <div>
    <router-link :to="`/${link}`">
      <div class="card">
        <div class="card-body">
          <div class="d-flex">
            <div class="flex-grow-1 overflow-hidden">
              <h5 class="text-truncate font-size-15">
                {{ featureName }}
              </h5>
              <p class="text-muted mb-4">
                {{ description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  featureName: String,
  link: String,
  description: String
});
</script>
