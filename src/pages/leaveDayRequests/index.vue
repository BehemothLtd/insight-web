<template>
  <div>
    <div class="row">
      <div class="text-right mb-4">
        <button
          type="button"
          class="btn btn-primary waves-effect waves-light float-right"
          @click="showModal()"
        >
          <i class="bx bx-plus-circle font-size-16 align-middle me-2"></i>
          New
        </button>
        <!-- <button
          type="button"
          class="btn btn-primary waves-effect waves-light float-right mr-2"
          @click="$router.push(`/leave_day_requests/report`)"
        >
          <i class="bx bxs-report font-size-16 align-middle me-2"></i>
          Report
        </button> -->
      </div>
      <BasicDataFilter
        :search-fields-list="searchFieldsList"
        :query="query"
        search-title=""
        @search="fetchListLeaveDayRequest"
        @reset="updateQuery({})"
      >
      </BasicDataFilter>

      <LeaveDayRequestList
        :leave-day-requests="list"
        :user-id="currentUser.id"
        @show-detail="leaveDayRequestDetail"
        @change-state="changeState"
      ></LeaveDayRequestList>
      <div>
        <Pagination
          :meta="metadata"
          @change="onPageChange"
        ></Pagination>
      </div>

      <b-modal
        ref="modal"
        title="Leave Day Request"
        centered
        hide-footer
        @hide="handleClose"
      >
        <LeaveDayRequestForm
          v-model="form"
          :request-types="requestTypes"
          @create="create"
          @update="update"
          @delete="onDelete"
          @close="hideModal"
        />
      </b-modal>
    </div>
  </div>
</template>

<script setup>
import { useBreadcrumb, useGoQuery } from "@bachdx/b-vuse";
import { ref, onMounted, inject } from "vue";
import {
  FetchListLeaveDayRequest,
  GetLeaveDayRequest,
  CreateLeaveDayRequest,
  UpdateLeaveDayRequest,
  DeleteLeaveDayRequest,
  LeaveDayRequestChangeState,
} from "@/apis/repositories";
import { useAuthStore } from "@/stores/auth";
import { FetchSelectOptions } from "@/apis/repositories";
import useDynamicSearch from "@/composable/dynamicSearch";
import SearchField from "@/types/searchField";
import { LeaveDayRequestForm as LeaveDayRequestFormModel } from "@/formModels";
import filters from "@/utilities/filters";
import useModal from "@/composable/modal";

const { setBreadcrumb } = useBreadcrumb();
const Swal = inject("Swal");

const { modal, showModal, hideModal } = useModal();

const query = ref({});
const { goQueryInput, updatePage, updateQuery } = useGoQuery({
  perPage: 10,
  query: query,
});
const authStore = useAuthStore();
const currentUser = authStore.currentUser;
const list = ref([]);
const metadata = ref({});
const userOptions = ref([]);
const form = ref({});
const requestTypes = [
  { value: "day_off", label: "Day off" },
  { value: "wfh", label: "Wfh" },
  { value: "insurance", label: "Insurance" },
  { value: "personal_days_off", label: "Personal days off" },
];

const { searchFieldsList, searchComponents } = useDynamicSearch();
searchFieldsList.value = [
  [
    new SearchField(
      "Type",
      "requestTypeEq",
      "mdi mdi-magnify",
      searchComponents.SingleSelectField,
      {
        selectOptions: requestTypes,
      },
    ),
    new SearchField(
      "State",
      "requestStateEq",
      "mdi mdi-magnify",
      searchComponents.SingleSelectField,
      {
        selectOptions: [
          {
            label: "Pending",
            value: "pending",
          },
          {
            label: "Approved",
            value: "approved",
          },
          {
            label: "Rejected",
            value: "rejected",
          },
        ],
      },
    ),
    new SearchField(
      "User",
      "userIdEq",
      "mdi mdi-magnify",
      searchComponents.SingleSelectField,
      {
        selectOptions: userOptions,
      },
    ),
  ],
];

async function fetchListLeaveDayRequest() {
  const result = await FetchListLeaveDayRequest({
    input: goQueryInput.pagyInput,
    query: goQueryInput.query,
  });

  list.value = result.LeaveDayRequests.collection;
  metadata.value = result.LeaveDayRequests.metadata;
}

onMounted(async () => {
  await fetchListLeaveDayRequest();
  const result = await FetchSelectOptions(["user"]);

  if (result.SelectOptions) {
    userOptions.value = result.SelectOptions.UserOptions;
  }
});

async function create() {
  const formData = new LeaveDayRequestFormModel(form.value);
  formData.from = filters.formatDateHourMinute(formData.from);
  formData.to = filters.formatDateHourMinute(formData.to);
  const result = await CreateLeaveDayRequest({ input: formData });
  if (result) {
    await fetchListLeaveDayRequest();
    hideModal();
  }
}

async function update(id) {
  const formData = new LeaveDayRequestFormModel(form.value);
  formData.from = filters.formatDateHourMinute(formData.from);
  formData.to = filters.formatDateHourMinute(formData.to);
  const result = await UpdateLeaveDayRequest(id, formData);
  if (result) {
    await fetchListLeaveDayRequest();
    hideModal();
  }
}

async function onDelete(id) {
  const result = await DeleteLeaveDayRequest(id);
  if (result) {
    await fetchListLeaveDayRequest();
    hideModal();
  }
}

async function leaveDayRequestDetail(id) {
  const result = await GetLeaveDayRequest(id);

  form.value = result.LeaveDayRequest;
  showModal();
}

function handleClose() {
  form.value = new LeaveDayRequestFormModel(ref({}));
}

function onPageChange(page) {
  updatePage(page, fetchListLeaveDayRequest);
}

async function changeState(id, state) {
  const confirmation = await Swal.fire({
    title: "Notice !",
    icon: "warning",
    html: `This request will be ${state}? `,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  });
  if (confirmation.isConfirmed) {
    await LeaveDayRequestChangeState(id, state);

    fetchListLeaveDayRequest();
  }
}

setBreadcrumb({
  title: "Leave Day Request List",
  items: [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "Leave Day Request",
      href: "/leave_day_requests",
    },
    {
      text: "List",
      active: true,
    },
  ],
});
</script>
