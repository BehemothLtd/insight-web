<template>
  <div>
    <div class="row">
      <div class="text-right">
        <button
          type="button"
          class="btn btn-primary waves-effect waves-light float-right"
          @click="$router.push(`/leave_day_requests`)"
        >
          <i class="bx bxs-report font-size-16 align-middle me-2"></i>
          List Request
        </button>
      </div>

      <BasicDataFilter
        :search-fields-list="searchFieldsList"
        :query="query"
        @search="fetchList"
      >
      </BasicDataFilter>

      <RequestReport :leave-day-request-report="report"></RequestReport>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useBreadcrumb, useGoQuery } from "@bachdx/b-vuse";
import { FetchSelectOptions } from "@/apis/repositories";
import useDynamicSearch from "@/composable/dynamicSearch";
import SearchField from "@/types/searchField";
import { LeaveDayRequestTypes } from "@/constants";
import moment from "moment";
import { LeaveDayRequestReport } from "@/apis/repositories";

const { searchFieldsList, searchComponents } = useDynamicSearch();

const { setBreadcrumb } = useBreadcrumb();

const userOptions = ref([]);
const query = ref({});
const report = ref([]);

const { goQueryInput } = useGoQuery({
  perPage: 100,
  query: query,
});

const defaultDateRange = [
  moment().startOf("month").format("YYYY-MM-DD"),
  moment().endOf("month").format("YYYY-MM-DD"),
];

searchFieldsList.value = [
  [
    new SearchField(
      "User",
      "userIdEq",
      "bx bx-user",
      searchComponents.SingleSelectField,
      {
        selectOptions: userOptions,
        parseMethod: (value) => {
          return value ? parseInt(value) : null;
        },
      },
    ),
    new SearchField(
      "Request Type",
      "requestTypeIn",
      "bx bx-user",
      searchComponents.MultipleSelectField,
      {
        selectOptions: LeaveDayRequestTypes,
        defaultValue: ["day_off"],
      },
    ),
  ],
  [
    new SearchField(
      "Time",
      "created_at_between",
      "bx-time-five",
      searchComponents.DateRangeField,
      {
        defaultValue: defaultDateRange,
      },
    ),
  ],
];

setBreadcrumb({
  title: "Leave Day Request Report",
  items: [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "Leave Day Request Report",
      href: "/leave_day_requests/report",
    },
    {
      text: "Report",
      active: true,
    },
  ],
});

async function fetchList() {
  const result = await LeaveDayRequestReport({
    query: goQueryInput.query,
  });

  report.value = result.RequestReport;
}

onMounted(async () => {
  const result = await FetchSelectOptions(["user"]);

  if (result.SelectOptions) {
    userOptions.value = result.SelectOptions.UserOptions;
  }

  fetchList();
});
</script>
