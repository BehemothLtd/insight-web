<template>
  <div>
    <div class="row">
      <div
        v-if="writePermission"
        class="text-right mb-3"
      >
        <button
          type="button"
          class="btn btn-primary waves-effect waves-light"
          @click="openModalCreateIssueStatus"
        >
          <i class="bx bx-plus-circle font-size-16 align-middle me-2"></i>
          New
        </button>
      </div>

      <BasicDataFilter
        :search-fields-list="searchFieldsList"
        :query="query"
        search-title=""
        @search="fetchIssueStatusList"
        @reset="resetQuery(fetchIssueStatusList)"
      >
      </BasicDataFilter>
      <IssueStatusList
        :issue-statuses="list"
        @show-detail="fetchIssueStatusDetail"
      />
      <Pagination
        :meta="metadata"
        @change="onPageChange"
      ></Pagination>
    </div>

    <IssueStatusModal
      ref="issueStatusModal"
      v-model="issueStatus"
      :title="modalTitle()"
      :has-permission="writePermission"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, inject, computed } from "vue";
import useDynamicSearch from "@/composable/dynamicSearch";
import { useBreadcrumb, useGoQuery } from "@bachdx/b-vuse";
import {
  FetchIssueStatuses,
  FetchIssueStatus,
  CreateIssueStatus,
  UpdateIssueStatus,
} from "@/apis/repositories";
import SearchField from "@/types/searchField";

// ===========PERMISSION========
const hasPermissionOn = inject("hasPermissionOn");

const writePermission = computed(() =>
  hasPermissionOn("issue_statuses", "write"),
);

const query = ref({});
const list = ref([]);
const metadata = ref({});
const issueStatusModal = ref();
const issueStatus = ref({});

const { goQueryInput, resetQuery, updatePage } = useGoQuery({
  perPage: 10,
  query: query,
});
const { setBreadcrumb } = useBreadcrumb();
const { searchFieldsList, searchComponents } = useDynamicSearch();
searchFieldsList.value = [
  [
    new SearchField(
      "Title",
      "titleCont",
      "mdi mdi-magnify",
      searchComponents.TextInputField,
    ),
    new SearchField(
      "Type",
      "statusTypeEq",
      "mdi mdi-cog-outline",
      searchComponents.SingleSelectField,
      {
        selectOptions: [
          {
            label: "Normal",
            value: "normal",
          },
          {
            label: "System",
            value: "system",
          },
        ],
      },
    ),
  ],
];

onMounted(async () => {
  await fetchIssueStatusList();
});

setBreadcrumb({
  title: "ISSUE STATUS LIST",
  items: [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "Issue Status",
      href: "/issue_statuses",
    },
    {
      text: "List",
      active: true,
    },
  ],
});

async function fetchIssueStatusList() {
  const result = await FetchIssueStatuses({
    input: goQueryInput.pagyInput,
    query: goQueryInput.query,
  });

  list.value = result.IssueStatuses.collection;
  metadata.value = result.IssueStatuses.metadata;
}

async function fetchIssueStatusDetail(id) {
  const result = await FetchIssueStatus(id);
  issueStatus.value = result.IssueStatus;
  issueStatusModal.value.showModal();
}

function openModalCreateIssueStatus() {
  issueStatus.value = {
    title: "",
    color: "#030303",
  };
  issueStatusModal.value.showModal();
}

async function onSubmit(issueStatus) {
  if (issueStatus.id) {
    await UpdateIssueStatus({
      id: issueStatus.id,
      input: issueStatus,
    }).then((res) => {
      if (res) {
        fetchIssueStatusList();
        issueStatusModal.value.hideModal();
      }
    });
  } else {
    await CreateIssueStatus({
      input: { ...issueStatus, statusType: "normal" },
    }).then((res) => {
      if (res) {
        fetchIssueStatusList();
        issueStatusModal.value.hideModal();
      }
    });
  }
}

function modalTitle() {
  return issueStatus.value.id ? "Issue status" : "New issue status";
}

function onPageChange(page) {
  updatePage(page, fetchIssueStatusList);
}
</script>
