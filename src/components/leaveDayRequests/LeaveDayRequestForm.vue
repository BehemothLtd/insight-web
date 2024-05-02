<template>
  <b-card>
    <b-row class="d-flex align-items-baseline">
      <b-col cols="1">
        <i class="bx bx-collection icon"></i>
      </b-col>

      <b-col cols="11">
        <form-validator
          label="Request Type"
          name="requestType"
          required
        >
          <el-select-v2
            v-model="leaveDayRequest.requestType"
            class="w-100"
            filterable
            clearable
            :options="LeaveDayRequestTypes"
            :searchable="true"
          />
        </form-validator>
      </b-col>
    </b-row>

    <b-row class="d-flex align-items-baseline mt-3">
      <b-col cols="1">
        <i class="bx bx-calendar icon"></i>
      </b-col>

      <b-col cols="11">
        <form-validator
          label="From"
          name="from"
          required
        >
          <DatePicker
            v-model="leaveDayRequest.from"
            :start-time="startTime"
            class="date-picker"
            :format="formatDate"
            placeholder="Select Date"
            @update:model-value="handleDate"
          ></DatePicker>
        </form-validator>
      </b-col>
    </b-row>

    <b-row class="d-flex align-items-baseline mt-3">
      <b-col cols="1">
        <i class="bx bx-calendar icon"></i>
      </b-col>

      <b-col cols="11">
        <form-validator
          label="To"
          name="to"
          required
        >
          <DatePicker
            v-model="leaveDayRequest.to"
            :start-time="endTime"
            :format="formatDate"
            auto-apply
            placeholder="Select Date"
            class="date-picker"
            @update:model-value="handleDate"
          ></DatePicker>
        </form-validator>
      </b-col>
    </b-row>

    <b-row class="d-flex align-items-baseline mt-3">
      <b-col cols="1">
        <i class="bx bx-stopwatch icon"></i>
      </b-col>

      <b-col cols="11">
        <form-validator
          label="Time Off"
          name="timeOff"
          required
        >
          <input
            v-model="leaveDayRequest.timeOff"
            type="number"
            class="form-control"
            placeholder="Time off"
          />
        </form-validator>
      </b-col>
    </b-row>

    <b-row class="d-flex align-items-baseline mt-3">
      <b-col cols="1">
        <i class="bx bx-book-content icon"></i>
      </b-col>

      <b-col cols="11">
        <form-validator
          label="Description"
          name="description"
          icon="bx bx-info-circle icon"
          :description="reasonDescription"
        >
          <el-select-v2
            v-model="leaveDayRequest.reason"
            class="w-100"
            filterable
            allow-create
            placeholder="Reason..."
            clearable
            :options="LeaveDayRequestReasons"
            :searchable="true"
          />
        </form-validator>
      </b-col>
    </b-row>

    <!-- <b-row class="d-flex align-items-baseline mt-3">
      <b-col cols="1">
        <i class="bx bx bx-user icon"></i>
      </b-col>

      <b-col cols="11">
        <FormValidator
          label="User"
          name="mentions"
          required
        >
          <VSelect
            v-model="leaveDayRequest.mentions"
            class="w-100"
            :options="userOptions"
            :reduce="(option) => option.value"
          >
          </VSelect>
        </FormValidator>
      </b-col>
    </b-row> -->
  </b-card>

  <div class="modal-footer pb-0">
    <button
      v-if="leaveDayRequest.id"
      type="button"
      class="btn btn-danger"
      data-bs-dismiss="modal"
      @click="$emit('delete', leaveDayRequest.id)"
    >
      Delete
    </button>

    <button
      type="button"
      class="btn btn-secondary"
      data-bs-dismiss="modal"
      @click="$emit('close')"
    >
      Close
    </button>
    <button
      type="button"
      class="btn btn-primary"
      @click="submitForm"
    >
      Save
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { LeaveDayRequestTypes, LeaveDayRequestReasons } from "@/constants";

const startTime = ref({ hours: 8, minutes: 30 });
const endTime = ref({ hours: 18, minutes: 30 });
const leaveDayRequest = defineModel();
const emits = defineEmits(["create", "update", "delete", "close"]);

// =============METHODS=========
function calculateTimeOff(from, to) {
  if (from.getDate() !== to.getDate()) {
    let weekdaysCount = 0;

    for (let day = from; day <= to; day.setDate(day.getDate() + 1)) {
      const dayOfWeek = day.getDay();

      // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        weekdaysCount++;
      }
    }

    return (leaveDayRequest.value.timeOff = weekdaysCount * 8);
  } else {
    leaveDayRequest.value.timeOff = (to - from) / 3600000;

    if (from.getHours() <= 12 && to.getHours() >= 14) {
      leaveDayRequest.value.timeOff -= 2;
    }
    return leaveDayRequest.value.timeOff;
  }
}

const handleDate = () => {
  if (leaveDayRequest.value.from && leaveDayRequest.value.to) {
    calculateTimeOff(
      new Date(leaveDayRequest.value.from),
      new Date(leaveDayRequest.value.to),
    );
  } else {
    leaveDayRequest.value.timeOff = 0;
  }
};

function submitForm() {
  leaveDayRequest.value.id
    ? emits("update", leaveDayRequest.value.id)
    : emits("create");
}

const formatDate = "dd/MM/yyyy HH:mm";
const reasonDescription =
  "You can make your own reason without these options below";
</script>
