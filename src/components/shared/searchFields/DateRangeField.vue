<template>
  <div class="row">
    <div class="col-md-6 position-relative mb-3 mb-md-0">
      <i class="mdi mdi-calendar-check-outline"></i>
      <DatePicker
        v-model="startDate"
        :enable-time-picker="false"
        placeholder="Start Date"
        @cleared="startDate = ''"
      />
    </div>

    <div class="col-md-6 position-relative">
      <i class="mdi mdi-calendar-check-outline"></i>
      <DatePicker
        v-model="endDate"
        :enable-time-picker="false"
        placeholder="End Date"
        @cleared="endDate = ''"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  classes: {
    type: String,
    required: false,
    default: "form-control w-100 p-1",
  },
  options: {
    type: Object,
    default: () => {
      return {
        dateRangeDefault: ["", ""],
      };
    },
  },
});

const startDate = ref(props.options.dateRangeDefault[0]);
const endDate = ref(props.options.dateRangeDefault[1]);

const emit = defineEmits(["updated"]);

defineExpose({
  clear,
});

function clear() {
  startDate.value = "";
  endDate.value = "";
}

watch(startDate, () => {
  emitUpdate();
});

watch(endDate, () => {
  emitUpdate();
});

function emitUpdate() {
  emit("updated", [startDate.value, endDate.value]);
}
</script>

<style lang="scss" scoped>
i {
  position: absolute;
  top: 50%;
  left: 22px;
  transform: translateY(-50%);
  color: #a8a8a8;
  background-color: white;
  line-height: normal;
  font-size: 24px;
  z-index: 1;
}
:deep(.dp__input) {
  padding-left: 50px;
  &::placeholder {
    color: lightgray;
  }
}
</style>
