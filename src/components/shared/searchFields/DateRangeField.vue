<template>
  <div class="row">
    <div class="col-md-6 position-relative mb-3 mb-md-0">
      <i class="mdi mdi-calendar-check-outline"></i>
      <DatePicker
        :model-value="searchDateRange[0]"
        @update:model-value="
          (event) => (searchDateRange[0] = handleFormat(event))
        "
        :enable-time-picker="false"
        placeholder="Start Date"
        @cleared="searchDateRange[0] = ''"
      />
    </div>

    <div class="col-md-6 position-relative">
      <i class="mdi mdi-calendar-check-outline"></i>
      <DatePicker
        :model-value="searchDateRange[1]"
        @update:model-value="
          (event) => (searchDateRange[1] = handleFormat(event))
        "
        :enable-time-picker="false"
        placeholder="End Date"
        @cleared="searchDateRange[1] = ''"
      />
    </div>
  </div>
</template>

<script setup>
import moment from "moment";

const handleFormat = (data) => {
  return moment(data).format(props.formatValue);
};

const props = defineProps({
  classes: {
    type: String,
    required: false,
    default: "form-control w-100 p-1",
  },
  formatValue: {
    type: String,
    default: "YYYY-MM-DD",
  },
});

const searchDateRange = defineModel();

defineExpose({
  clear,
});

function clear() {
  searchDateRange.value = ["", ""];
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
