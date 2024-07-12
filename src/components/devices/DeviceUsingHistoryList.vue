<template>
  <div class="table-responsive">
    <table
      class="table table-hover project-list-table table-nowrap align-middle table-borderless"
    >
      <thead class="thead-light">
        <tr>
          <th scope="col">State</th>
          <th scope="col">User</th>
          <th scope="col">Time</th>
          <th scope="col"></th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(history, index) in devicesUsingHistories"
          :key="history.id"
        >
          <td>
            <BadgeLabel
              :text="history.state"
              :code="history.state"
              target="devices"
            ></BadgeLabel>
          </td>
          <td>
            {{ history.user.name }}
          </td>
          <td>
            {{ filters.fullDateTime(history.createdAt) }}
          </td>
          <td>
            <svg
              v-if="index != 0"
              style="color: blue"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-down-circle"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
                fill="blue"
              ></path>
            </svg>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination
      :meta="metadata"
      @change="onPageChange"
    ></Pagination>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useGoQuery } from "@bachdx/b-vuse";
import { FetchDevicesUsingHistory } from "@/apis/repositories";

const props = defineProps({
  deviceId: {
    type: String,
    required: true,
  },
});

const query = ref({});
const metadata = ref({});
const devicesUsingHistories = ref([]);

const { goQueryInput, updatePage } = useGoQuery({
  perPage: 10,
  query: query,
});

async function fetchListDevicesUsingHistories() {
  const result = await FetchDevicesUsingHistory({
    input: goQueryInput.pagyInput,
    query: goQueryInput.query,
  });

  devicesUsingHistories.value = result.DevicesUsingHistories.collection;
  metadata.value = result.DevicesUsingHistories.metadata;
}

function onPageChange(page) {
  updatePage(page, fetchListDevicesUsingHistories);
}

onMounted(async () => {
  query.value = { deviceIdIn: Number(props.deviceId) };

  await fetchListDevicesUsingHistories();
});
</script>

<style lang="scss" scoped>
.table-responsive {
  max-height: 70vh;
}
</style>
