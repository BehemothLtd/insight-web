<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title mb-4">{{ date }}</h4>

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
        <AttendanceList
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
import { ref, reactive, onMounted } from "vue";
import { useGoQuery } from "@bachdx/b-vuse";
import api from "@/apis/axios";

import { SelfAttendancesGQL } from "@/apis/resolvers";

const query = reactive({});
const { goQueryInput, updatePage } = useGoQuery({ perPage: 2, query: query });

const list = ref([]);
const metadata = ref({});

async function fetchSelfAttendances() {
  const result = await api(SelfAttendancesGQL, {
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

onMounted(async () => {
  await fetchSelfAttendances();
});

function onPageChange(page) {
  updatePage(page, fetchSelfAttendances);
}

function onSearch() {
  console.log(query);
  fetchSelfAttendances();
}

function closedModal() {}
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
  .history-check-today {
    margin-top: 30px;
    max-height: 400px;
    overflow-y: auto;
    .check-item {
      border-bottom: 1px solid #efefef;
      border-radius: 5px;
      .item-type {
        width: 40%;
        span {
          color: #f23f3f;
          border: 1px solid #f23f3f;
          background-color: #fce8e7;
          padding: 3px 10px;
          border-radius: 20px;
          &.bg-checkin {
            color: #4bd989;
            border: 1px solid #4bd989;
            background-color: #e6f9f0;
          }
        }
      }
      .item-date {
        width: 60%;
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
}
</style>
