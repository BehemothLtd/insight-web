<template>
  <div>
    <div class="timeSheet-table">
      <div
        v-dragscroll:nochilddrag
        class="w-100 timeSheet-list cursor-pointer"
      >
        <div
          v-for="item in listDate"
          :key="item.value"
          class="timeLog-col"
        >
          <div class="card h-100 board-column">
            <div
              class="info-row d-flex align-items-center justify-content-between"
            >
              <div class="calendar-date">
                {{ filters.fullDateDay(item.value) }}
              </div>
              <div class="time-counter">
                <span>{{ item.totalLoggedTime }}h</span>
                <span>of</span>
                <span>{{ maxHourPerDay }}h</span>
              </div>
            </div>
            <div class="progress-bar-container">
              <span v-if="item.totalLoggedTime <= maxHourPerDay">
                <b-progress
                  :value="item.totalLoggedTime"
                  :max="maxHourPerDay"
                  class="mb-3 mt-2"
                  variant="info"
                  animated
                ></b-progress>
              </span>
              <span v-else>
                <b-progress
                  :value="item.totalLoggedTime"
                  :max="maxHourPerDay"
                  class="mb-3 mt-2"
                  variant="danger"
                  animated
                ></b-progress>
              </span>
            </div>

            <button
              class="btn logtime-button d-flex"
              @click="onLogTime(null, item.value, null, null)"
            >
              <i class="fas fa-plus"></i>
            </button>

            <draggable
              :list="getList(item.value)"
              group="tasks"
              class="drag-group full-flex flex-column"
              item-key="name"
              v-bind="dragOptions"
              @change="(e) => dragItem(e, item.value)"
            >
              <template #item="{ element }">
                <div
                  class="issue-card"
                  @click="
                    onLogTime(
                      element.id,
                      element.loggedAt,
                      Number(element.projectId),
                      Number(element.issueId),
                    )
                  "
                >
                  <div class="issue-info">
                    <div class="issue-name">{{ element.issueName }}</div>
                    <div class="issue-description">
                      {{ element.issueDescription }}
                    </div>
                  </div>
                  <div class="issue-timelog">
                    {{ filters.hoursWithMinutes(element.minutes) }}
                  </div>

                  <div class="timelog-actions text-right">
                    <!-- <button
                      v-b-tooltip.hover
                      class="btn action-btn"
                      title="duplicate"
                      @click.stop.prevent="onCopy(element)"
                    >
                      <i class="fas fa-copy"></i>
                    </button> -->
                    <button
                      v-b-tooltip.hover
                      class="btn action-btn"
                      title="delete"
                      @click.stop.prevent="onDelete(element.id)"
                    >
                      <i class="bx bx bx-trash"></i>
                    </button>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
    </div>
    <WorkingTimelogModal
      ref="modalWorkingTimelog"
      :project-options="projectOptions"
      @refetch="fetchList"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch, inject } from "vue";
import moment from "moment";
import {
  selfWorkingTimelogs,
  FetchSelectOptions,
  destroyWorkingTimelog,
} from "@/apis/repositories";

import draggable from "vuedraggable";
// ===========DATA=========
const dragOptions = ref({
  animation: 150,
  group: "tasks",
  ghostClass: "ghost",
});
const timelogHistoryInput = defineModel();
const projectOptions = ref([]);
const Swal = inject("Swal");

const modalWorkingTimelog = ref();

const maxHourPerDay = 8;
const timelogHistory = ref([]);

const listDate = computed(() => {
  const startDate = moment(timelogHistoryInput.value.startDate);
  const endDate = moment(timelogHistoryInput.value.endDate);
  const dates = [];

  while (startDate.isSameOrBefore(endDate, "day")) {
    const date = startDate.format("YYYY-MM-DD");
    dates.push({
      value: date,
      totalLoggedTime: getTotalLoggedTime(date),
    });
    startDate.add(1, "days");
  }

  return dates;
});

function getList(date) {
  let result = [];
  if (timelogHistory.value.length) {
    result = timelogHistory.value.filter((e) => e.loggedAt === date);
  }
  return result;
}

function getTotalLoggedTime(date) {
  if (timelogHistory.value.length) {
    const listLoggedInDate = timelogHistory.value.filter(
      (e) => e.loggedAt === date,
    );
    return listLoggedInDate.length
      ? listLoggedInDate.reduce((sum, obj) => sum + obj.minutes, 0) / 60
      : 0;
  } else return 0;
}

function onLogTime(id, loggedAt, projectId, issueId) {
  loggedAt = moment(loggedAt).format("DD-MM-YYYY");
  let disabledOptions = [];
  if (id) {
    disabledOptions = ["projectId", "issueId"];
  }
  modalWorkingTimelog.value.show(
    {
      id,
      loggedAt,
      projectId,
      issueId,
      description: "",
    },
    disabledOptions,
  );
}
watch(
  () => timelogHistoryInput.value,
  () => {
    fetchList();
  },
  { deep: true },
);

function closeModal() {
  modalWorkingTimelog.value.hide();
}

async function onDelete(id) {
  const confirmation = await Swal.fire({
    title: "Warning !",
    icon: "warning",
    html: "Are you sure want to delete this timelog?",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  });
  if (confirmation.isConfirmed) {
    await destroyWorkingTimelog({ id });
    fetchList();
  }
}

async function fetchList() {
  const result = await selfWorkingTimelogs({
    query: {
      loggedAtBetween: [
        timelogHistoryInput.value["startDate"],
        timelogHistoryInput.value["endDate"],
      ],
    },
  });
  timelogHistory.value = result.SelfWorkingTimeLogHistory;
}

onMounted(async () => {
  fetchList();
  const response = await FetchSelectOptions(["currentUserProjects"]);
  projectOptions.value = response.SelectOptions.CurrentUserProjectOptions;
});
</script>
<style lang="scss" scoped>
.timeSheet-list {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  min-height: calc(100vh - 500px);
}
.timeLog-col {
  border: 1px solid rgba(224, 226, 236, 0.64);
  padding: 15px 10px;
  overflow: hidden;
}
.timeLog-col:not(:last-child) {
  border-right: none;
}
.info-row {
  margin-bottom: 10px;
  .time-counter {
    display: flex;
    gap: 5px;
    align-items: center;
    height: 100%;
  }
  .calendar-date {
    background-color: #fff;
  }
}

.logtime-button {
  border-color: transparent;
  background-color: rgba(0, 71, 136, 0.08);
  color: rgb(0, 27, 60);
  font-weight: 500;
  font-size: 12px;
  width: 100%;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
}

.issue-card {
  display: flex;
  width: 100%;
  background: rgb(238, 243, 248);
  min-height: 80px;
  margin-bottom: 12px !important;
  color: rgba(0, 28, 61, 0.72);
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 14px;
  padding: 8px !important;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 3px 0px;
  gap: 8px;
  cursor: pointer;
  overflow: hidden;
  .issue-name {
    font-weight: bold;
    -webkit-line-clamp: 2;
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .issue-timelog {
    font-weight: bold;
    white-space: nowrap;
    width: 50px;
    text-align: right;
  }
  .issue-description {
    -webkit-line-clamp: 3;
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    width: calc(100% + 40px);
    margin-top: 5px;
    word-break: break-all;
    font-weight: light;
  }
  .timelog-actions {
    position: absolute;
    bottom: 0px;
    right: 0;
    background: #fffffffa;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    display: none;
    transition: 0.2s;
  }

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    cursor: pointer;
  }
}

.issue-card:hover {
  .timelog-actions {
    display: block !important;
    .action-btn:hover {
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
