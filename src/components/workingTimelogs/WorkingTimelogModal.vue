<template>
  <b-modal
    ref="modal"
    title="Working Timelog Modal"
    title-class="font-18"
  >
    <b-card>
      <b-row class="d-flex align-items-baseline">
        <b-col cols="1">
          <i class="bx bx-collection icon"></i>
        </b-col>

        <b-col cols="11">
          <form-validator
            label="Project"
            name="project_id"
            required
          >
            <el-select-v2
              v-model="workingTimelog.projectId"
              class="w-100"
              filterable
              clearable
              :disabled="fieldIsDisabled('projectId')"
              :options="projectOptions"
              :searchable="true"
            />
          </form-validator>
        </b-col>
      </b-row>

      <b-row
        v-if="workingTimelog.projectId"
        class="d-flex align-items-baseline mt-3"
      >
        <b-col cols="1">
          <i class="bx bx-notepad icon"></i>
        </b-col>

        <b-col cols="11">
          <form-validator
            label="Issue"
            name="issue_id"
            required
          >
            <el-select-v2
              v-model="workingTimelog.issueId"
              class="w-100"
              filterable
              clearable
              :disabled="fieldIsDisabled('issueId')"
              :options="issueOptions"
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
            label="Date"
            name="logged_at"
            required
          >
            <DatePicker
              v-model="workingTimelog.loggedAt"
              class="date-picker"
              placeholder="Select Date"
              auto-apply
              :enable-time-picker="false"
              :disabled="fieldIsDisabled('loggedAt')"
              model-type="dd-MM-yyyy"
              format="dd/MM/yyyy"
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
            label="Duration"
            name="minutes"
            required
          >
            <div class="d-flex justify-content-between mb-3">
              <input
                v-model="hours"
                type="number"
                class="form-control w-75"
                placeholder="0"
                :disabled="fieldIsDisabled('minutes')"
                step="1"
                max="24"
                min="0"
              />
              <div class="text-right align-self-center">Hours</div>
            </div>
            <div class="d-flex justify-content-between">
              <input
                v-model="minutes"
                type="number"
                class="form-control w-75"
                placeholder="0"
                :disabled="fieldIsDisabled('minutes')"
                step="1"
                max="60"
                min="0"
              />
              <div class="text-right align-self-center">Minutes</div>
            </div>
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
          >
            <textarea
              v-model="workingTimelog.description"
              class="form-control"
            />
          </form-validator>
        </b-col>
      </b-row>

      <div
        v-if="dataExisted"
        class="text-muted mt-2"
      >
        You have already log time for the same issue and date. Please update!
      </div>

      <div class="my-5 text-right">
        <b-button
          variant="outline-primary"
          class="mr-2"
          @click="$emit('close')"
        >
          Cancel
        </b-button>

        <b-button
          variant="primary"
          class="mr-2"
          @click="submit()"
        >
          <span>Confirm Logtime</span>
        </b-button>

        <b-button
          variant="primary"
          @click="submit(true)"
        >
          Log time continously
        </b-button>
      </div>
    </b-card>
  </b-modal>
</template>

<script setup>
import useModal from "@/composable/modal";
import { ref, onMounted, watch, computed } from "vue";
import { useGlobalStore } from "@/stores/global";
import { FetchSelectOptions } from "@/apis/repositories";
import {
  logTime,
  fetchWorkingTimelogByAttr,
} from "@/apis/repositories/workingTimelogRepository";
import { WorkingTimelogForm } from "@/formModels";

const globalStore = useGlobalStore();
const { modal, showModal, hideModal } = useModal();

const workingTimelog = ref({
  description: "",
  minutes: 0,
  loggedAt: null,
  issueId: null,
  projectId: null,
});
const disableFields = ref([]);
const issueOptions = ref([]);

const dataExisted = ref(false);

defineExpose({
  show,
});
const emits = defineEmits(["reinit", "refetch"]);
defineProps({
  projectOptions: {
    type: Object,
    default: [],
  },
});

const hours = computed({
  get() {
    const totalMinutes = workingTimelog.value.minutes || 0;
    return Math.floor(totalMinutes / 60);
  },
  set(val) {
    workingTimelog.value.minutes = Number(val) * 60 + minutes.value;
  },
});

const minutes = computed({
  get() {
    const totalMinutes = workingTimelog.value.minutes || 0;
    return totalMinutes % 60;
  },
  set(val) {
    workingTimelog.value.minutes = hours.value * 60 + Number(val);
  },
});

const workingTimelogWatchData = computed(() => {
  return {
    loggedAt: workingTimelog.value.loggedAt,
    projectId: workingTimelog.value.projectId,
    issueId: workingTimelog.value.issueId,
  };
});

function show(initWorkingTimelog, initDisabledField = []) {
  if (initWorkingTimelog) {
    workingTimelog.value = initWorkingTimelog;
  } else {
    workingTimelog.value = {
      description: "",
      minutes: 0,
      loggedAt: null,
      issueId: null,
      projectId: null,
    };
  }

  disableFields.value = initDisabledField;
  fetchIssue(workingTimelog.value.projectId);

  showModal();
}

async function hide() {
  globalStore.setValidationErrors({});
  hideModal();
}

async function submit(keepShowing = false) {
  if (!workingTimelog.value.projectId) {
    return globalStore.setValidationErrors({
      project_id: ["Project can't be blank"],
    });
  }

  if (!workingTimelog.value.issueId) {
    return globalStore.setValidationErrors({
      issue_id: ["Issue can't be blank"],
    });
  }

  try {
    const response = await logTime({
      input: new WorkingTimelogForm(workingTimelog.value),
      issueId: workingTimelog.value.issueId,
    });
    if (response) {
      hide();
      emits("refetch");
      if (keepShowing) emits("reinit");
    }
  } catch (e) {
    console.log(e, "err");
  }
}

async function fetchIssue(projectId) {
  if (projectId) {
    const result = await FetchSelectOptions(["currentUserProjectIssues"], {
      projectId: projectId.toString(),
    });
    if (result.SelectOptions) {
      issueOptions.value = result.SelectOptions.CurrentUserProjectIssueOptions;
    }
  }
}

watch(
  () => workingTimelog.value.projectId,
  async (newVal) => {
    workingTimelog.value.issueId = null;
    if (newVal) {
      await fetchIssue(newVal);
    }
  },
);

watch(
  () => workingTimelogWatchData.value,
  async (val) => {
    if (val.projectId && val.issueId && val.loggedAt) {
      const response = await fetchWorkingTimelogByAttr({
        projectId: workingTimelog.value.projectId.toString(),
        issueId: workingTimelog.value.issueId.toString(),
        loggedAt: workingTimelog.value.loggedAt,
      });

      dataExisted.value = response.WorkingTimelogByAttributes.dataExisted;

      if (response.WorkingTimelogByAttributes.dataExisted) {
        const workingTimelogData =
          response.WorkingTimelogByAttributes.workingTimelog;
        workingTimelog.value.minutes = workingTimelogData.minutes;
        workingTimelog.value.description = workingTimelogData.description;
      }
    }
  },
);

function fieldIsDisabled(field) {
  return disableFields.value.includes(field);
}
</script>
