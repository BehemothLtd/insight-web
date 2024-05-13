<template>
  <BasicDataFilter
    :search-fields-list="searchFieldsList"
    :query="query"
    @search="fetchList"
  />

  <div class="text-right p-4">
    <button
      type="button"
      class="btn btn-primary waves-effect waves-light"
      :disabled="!writePermission"
      @click="showModal()"
    >
      <i class="bx bx-plus-circle font-size-16 align-middle me-2"></i>
      New
    </button>
  </div>

  <AttendanceList
    :list="attendances"
    :write-permission="writePermission"
    @delete="destroy"
    @detail="showAttendance"
  ></AttendanceList>
  <div>
    <Pagination
      :meta="metadata"
      @change="onPageChange"
    ></Pagination>
  </div>

  <b-modal
    ref="modal"
    size="lg"
    centered
    :title="`Attendance ${attendance.id ? 'Update' : 'Create'}`"
    hide-footer
    @hide="handleClose"
  >
    <AttendanceForm
      v-model="attendance"
      :user-options="userOptions"
      @create="create"
      @update="update"
    ></AttendanceForm>
  </b-modal>
</template>

<script setup>
import { inject, ref, onMounted, computed } from "vue";

// ===========BREAD CRUMB========
import { useBreadcrumb } from "@bachdx/b-vuse";
const { setBreadcrumb } = useBreadcrumb();

setBreadcrumb({
  title: "Admin Attendance",
  items: [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "adminAttendance",
      href: "/adminAttendance",
      active: true,
    },
  ],
});

// ===========DYNAMIC SEARCH========
import SearchField from "@/types/searchField";
import useDynamicSearch from "@/composable/dynamicSearch";
import { FetchSelectOptions } from "@/apis/repositories";

const { searchFieldsList, searchComponents } = useDynamicSearch();
const userOptions = ref([]);

searchFieldsList.value = [
  [
    new SearchField(
      "User",
      "userIdEq",
      "bx bx-user",
      searchComponents.SingleSelectField,
      {
        selectOptions: userOptions,
      },
    ),
  ],
  [
    new SearchField(
      "Start Date",
      "checkinAtGteq",
      "",
      searchComponents.DateField,
      {
        modelFormat: "yyyy-MM-dd",
      },
    ),
    new SearchField(
      "End Date",
      "checkinAtLteq",
      "",
      searchComponents.DateField,
      {
        modelFormat: "yyyy-MM-dd",
      },
    ),
  ],
];

// ===========PERMISSION========
const hasPermissionOn = inject("hasPermissionOn");
const blockAccess = inject("blockAccess");

const writePermission = computed(() => hasPermissionOn("attendances", "write"));

// ===========QUERIES============
import { useGoQuery } from "@bachdx/b-vuse";
import { FetchAttendances } from "@/apis/repositories";

const query = ref({});
const { goQueryInput, updatePage, updateQuery } = useGoQuery({
  perPage: 10,
  query: query,
});
const attendances = ref([]);
const metadata = ref({});

async function fetchList() {
  const result = await FetchAttendances({
    input: goQueryInput.pagyInput,
    query: goQueryInput.query,
  });

  attendances.value = result.Attendances.collection;
  metadata.value = result.Attendances.metadata;
}

function onPageChange(page) {
  updatePage(page);
  fetchList();
}

// =========DETAILS ATTENDANCE=========
import {
  ShowAttendance,
  CreateAttendance,
  UpdateAttendance,
  DestroyAttendance,
} from "@/apis/repositories";
import useModal from "@/composable/modal";
import filters from "@/utilities/filters";

const { modal, showModal, hideModal } = useModal();
const Swal = inject("Swal");
const attendance = ref({});
const attendanceFormInput = computed(() => {
  return {
    userId: Number(attendance.value.userId) || 0,
    checkinAt: filters.formatDateHourMinute(attendance.value.checkinAt),
    checkoutAt: filters.formatDateHourMinute(attendance.value.checkoutAt),
  };
});

async function showAttendance(id) {
  const result = await ShowAttendance(id);

  attendance.value = result.Attendance;
  if (attendance.value.id) {
    showModal();
  }
}

function handleClose() {
  attendance.value = {};
}

async function create() {
  const result = await CreateAttendance({ input: attendanceFormInput.value });
  if (result) {
    await fetchList();
    hideModal();
  }
}

async function update(id) {
  const result = await UpdateAttendance({
    id,
    input: attendanceFormInput.value,
  });
  if (result) {
    await fetchList();
    hideModal();
  }
}

async function destroy(id) {
  const confirmation = await Swal.fire({
    title: "Warning!",
    text: "Delete attendance?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete",
    cancelButtonText: "No",
  });
  if (confirmation.isConfirmed) {
    const result = await DestroyAttendance(id);
    if (result) {
      await fetchList();
    }
  }
}

// ===========LIFE CYCLE===============
onMounted(async () => {
  if (!hasPermissionOn("attendances", "read")) {
    blockAccess();
  } else {
    await fetchList();
    const result = await FetchSelectOptions(["user"]);

    if (result.SelectOptions) {
      userOptions.value = result.SelectOptions.UserOptions;
    }
  }
});
</script>
