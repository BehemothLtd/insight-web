<template>
  <div class="row">
    <div class="col-lg-6 col-12">
      <div class="mt-4">
        <div><b>Total</b> {{ meta.total }} items</div>
        <div><b>Displaying:</b> {{ meta.from }} ~ {{ meta.to }}</div>
      </div>
    </div>

    <div class="col-lg-6 col-12">
      <b-pagination
        align="center"
        class="pagination-rounded mt-4"
        :model-value="meta.page"
        :total-rows="parseInt(meta.total)"
        :per-page="meta.perPage"
        @update:modelValue="onChange($event)"
      ></b-pagination>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  meta: {
    type: Object,
    required: false,
  },
});

const emits = defineEmits(["change"]);

function onChange(page) {
  if (page == 0) return;

  emits("change", page);
}
</script>
