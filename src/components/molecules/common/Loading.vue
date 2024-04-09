<template>
  <transition name="fade">
    <div
      v-if="loading"
      class="loading"
    >
      <!-- <div class="overlay"></div> -->
      <div class="progress-bar-container">
        <div
          class="progress-bar"
          :style="{ width: loadingProgress + '%' }"
        ></div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useGlobalStore } from "@/stores/global";

export default {
  setup() {
    const globalStore = useGlobalStore();
    const loading = computed(() => globalStore.loadingRequests.length > 0);
    const loadingProgress = ref(0);

    setInterval(() => {
      if (loading.value && loadingProgress.value < 100) {
        loadingProgress.value += 10;
      }
    }, 50);

    watch(loading, (newLoading) => {
      if (!newLoading) {
        loadingProgress.value = 0;
      }
    });

    return {
      loading,
      loadingProgress,
    };
  },
};
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.6);
  z-index: 1;
}

.progress-bar-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: transparent;
  z-index: 2;
}

.progress-bar {
  height: 80%;
  background: #df861d;
  transition: width 0.5s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-to {
  .progress-bar {
    width: 100% !important;
  }
}
</style>
