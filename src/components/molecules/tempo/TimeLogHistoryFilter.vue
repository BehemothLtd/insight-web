<template>
  <div class="d-flex align-items-center justify-content-between w-100">
    <div class="date-picker-container d-flex align-items-center mb-2 mt-2">
      <div
        class="selected-date d-flex justify-content-center align-items-center"
      >
        <i class="bx bx-calendar font-size-18"></i>
        <div>{{ formatDate.startDate }}</div>
        <div>-</div>
        <div>{{ formatDate.endDate }}</div>
      </div>
      <button
        type="button"
        class="btn btn-change-week"
        @click="decreaseWeek"
      >
        <i class="bx bx-chevron-left"></i>
      </button>
      <button
        type="button"
        class="btn btn-change-week"
        @click="addWeek"
      >
        <i class="bx bx-chevron-right"></i>
      </button>
      <button
        type="button"
        class="btn btn-today"
        @click="goToTodayWeek"
      >
        Today
      </button>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";

import moment from "moment";

// ===========STORE========

// ===========DATA=========

const timelogHistoryInput = defineModel();

const formatDate = computed(() => {
  return {
    startDate: moment(timelogHistoryInput.value.startDate).format(
      "Do MMMM, YYYY",
    ),
    endDate: moment(timelogHistoryInput.value.endDate).format("Do MMMM, YYYY"),
  };
});

function decreaseWeek() {
  timelogHistoryInput.value.startDate = moment(
    timelogHistoryInput.value.startDate,
  )
    .subtract(1, "weeks")
    .format("YYYY-MM-DD");
  timelogHistoryInput.value.endDate = moment(timelogHistoryInput.value.endDate)
    .subtract(1, "weeks")
    .format("YYYY-MM-DD");
}

function addWeek() {
  timelogHistoryInput.value.startDate = moment(
    timelogHistoryInput.value.startDate,
  )
    .add(1, "weeks")
    .format("YYYY-MM-DD");
  timelogHistoryInput.value.endDate = moment(timelogHistoryInput.value.endDate)
    .add(1, "weeks")
    .format("YYYY-MM-DD");
}

function goToTodayWeek() {
  timelogHistoryInput.value = {
    startDate: moment().startOf("week").add(1, "days").format("YYYY-MM-DD"),
    endDate: moment().endOf("week").add(1, "days").format("YYYY-MM-DD"),
  };
}
</script>
<style lang="scss" scoped>
.selected-date {
  gap: 10px;
  padding: 0 10px;
}

.btn-today {
  box-sizing: border-box;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  display: inline-flex;
  vertical-align: middle;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 1px;
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  margin: 0px;
  line-height: 20px;
  width: auto;
  max-width: 100%;
  color: rgb(0, 27, 60);
  background-color: rgb(255, 255, 255);
  border-color: rgb(224, 226, 236);
  transition: all 200ms ease-out 0s;
  padding: 8px;
  &:hover {
    text-decoration: none;
    color: rgb(0, 27, 60);
    background-color: rgb(251, 252, 255);
    border-color: rgb(224, 226, 236);
  }
}

.btn-change-week {
  margin: 0 5px;
  font-size: 18px;
  font-weight: bold;
  transition: all 200ms ease-out 0s;
  &:hover {
    text-decoration: none;
    color: rgb(0, 27, 60);
    background-color: rgb(251, 252, 255);
    border-color: rgb(224, 226, 236);
  }
}
</style>
