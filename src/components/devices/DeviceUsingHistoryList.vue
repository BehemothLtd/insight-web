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
          v-for="history in devicesUsingHistories"
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
          <td>{{ filters.fullDateTime(history.createdAt) }}</td>
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
  perPage: 20,
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
