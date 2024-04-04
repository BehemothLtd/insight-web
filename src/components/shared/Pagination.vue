<template>
  <div class="row">
    <div class="col-lg-12">
      <b-pagination
        class="pagination-rounded justify-content-center mt-4"
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
