<template>
  <div class="d-flex flex-direction-row justify-content-between">
    <div class="total-items">
      <div><b>Total</b> {{ meta.total }} items</div>
      <div><b>Displaying:</b> {{ meta.from }} ~ {{ meta.to }}</div>
    </div>

    <div>
      <b-pagination
        align="center"
        class="pagination-rounded mt-4"
        :model-value="meta.page"
        :total-rows="parseInt(meta.total)"
        :per-page="meta.perPage"
        @update:model-value="onChange($event)"
      ></b-pagination>
    </div>

    <div style="width: 110px"></div>
  </div>
</template>

<script setup>
defineProps({
  meta: {
    type: Object,
    required: false,
    default: () => {},
  },
});

const emits = defineEmits(["change"]);

function onChange(page) {
  if (page == 0) return;

  emits("change", page);
}
</script>

<style lang="scss" scoped>
.total-items {
  display: flex;
  flex-direction: column;
  align-self: center;
}
</style>
