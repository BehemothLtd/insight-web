<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title mb-4">{{ date }}</h4>

      <div class="check-form d-flex justify-content-center gap-3">
        <table
          class="table table-hover table-nowrap table-borderles"
          v-if="todayAttendance"
        >
          <tbody>
            <tr>
              <th>Date</th>
              <th>Checkin at</th>
              <th>Checkout at</th>
            </tr>

            <tr>
              <td>{{ filters.fullDate(todayAttendance.checkinAt) }}</td>
              <td>{{ filters.formatTime(todayAttendance.checkinAt) }}</td>
              <td>
                <span v-if="todayAttendance.checkoutAt">
                  {{ filters.formatTime(todayAttendance.checkinAt) }}
                </span>

                <b-button
                  v-else
                  variant="danger"
                  @click="attend"
                  class="attend-btn"
                >
                  <i class="fas fa-sign-out-alt"></i>
                  <span>Check out</span>
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>

        <div
          class="center"
          v-else
        >
          <b-button
            variant="success"
            @click="attend"
            class="attend-btn"
          >
            <i class="fas fa-sign-in-alt"></i>
            <span>Check in</span>
          </b-button>
        </div>
      </div>

      <div class="show-more">
        <span
          class="text-muted"
          @click="isShowAttendanceHistory = true"
        >
          Show more
        </span>
      </div>

      <b-modal
        ref="modal"
        v-model="isShowAttendanceHistory"
        size="xl"
        scrollable
        no-close-on-esc
        centered
        title="Attendance history"
        hide-footer
        @close="closedModal"
        @hide="closedModal"
      >
        <SelfAttendanceList
          :list="list"
          v-model="query"
          @search="onSearch"
        />

        <Pagination
          :meta="metadata"
          @change="onPageChange"
        ></Pagination>
      </b-modal>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { useGoQuery } from "@bachdx/b-vuse";
import { FetchSelfAttendances, SelfAttend } from "@/apis/repositories";

const Swal = inject("Swal");

const query = ref({});
const { goQueryInput, updatePage, updateQuery } = useGoQuery({
  perPage: 10,
  query: query,
});

const list = ref([]);
const metadata = ref({});

async function fetchSelfAttendances() {
  const result = await FetchSelfAttendances({
    input: goQueryInput.pagyInput,
    query: goQueryInput.query,
  });

  list.value = result.SelfAttendances.collection;
  metadata.value = result.SelfAttendances.metadata;
}

const isShowAttendanceHistory = ref(false);

const date = new Date().toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const todayAttendance = ref(null);

onMounted(async () => {
  await fetchSelfAttendances();
  checkInAttendedToday();
});

function onPageChange(page) {
  updatePage(page, fetchSelfAttendances);
}

function onSearch() {
  fetchSelfAttendances();
}

function checkInAttendedToday() {
  todayAttendance.value = list.value.find((item) => {
    return (
      new Date().toLocaleDateString() ===
      new Date(item.checkinAt).toLocaleDateString()
    );
  });
}

async function attend() {
  const action = todayAttendance.value == null ? "Check In" : "Check Out";

  const confirmation = await Swal.fire({
    title: "Warning !",
    icon: "warning",
    html: `Do you want to ${action} ?`,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  });

  if (confirmation.isConfirmed) {
    try {
      const result = await SelfAttend();
      todayAttendance.value = result.SelfAttend;
    } catch {}
  }
}

function closedModal() {
  query.value = {};
  updateQuery(query);
}
</script>

<style lang="scss" scoped>
.card {
  h4 {
    padding-bottom: 10px;
    border-bottom: 1px solid lightgray;
  }
  .check-form {
    button {
      border-radius: 20px;
      border: none;
      i {
        display: inline-block;
        padding-right: 5px;
        font-size: 15px;
      }
      span {
        font-weight: 500;
      }
    }
  }
  .show-more {
    text-align: right;
    margin-top: 10px;
    span {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .attend-btn {
    margin-top: -5px !important;
  }
}
</style>
