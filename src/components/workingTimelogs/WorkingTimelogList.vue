<template>
  <table
    class="table table-hover project-list-table table-nowrap align-middle table-borderless"
  >
    <thead class="thead-light">
      <tr>
        <th scope="col">ID</th>
        <th scope="col">User</th>
        <th scope="col">Description</th>
        <th scope="col">Time</th>
        <th scope="col">Date</th>
        <th scope="col">Action</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="log in workingTimelogs"
        :key="log.id"
      >
        <td>{{ log.id }}</td>
        <td>
          <div class="d-flex align-items-center">
            {{ log.user?.name }}
          </div>
        </td>
        <td>
          <router-link
            class="d-block"
            :to="`/projects/${log.project?.id}?issueId=${log.issue?.id}#boards`"
          >
            {{ log.issue?.title }}
          </router-link>
          {{ log.description }}
        </td>
        <td>{{ filters.hoursWithMinutes(log.minutes) }}</td>
        <td>{{ log.loggedAt }}</td>
        <td>
          <div class="d-flex gap-3">
            <span
              class="text-success btn-pointer"
              @click="
                onEdit(
                  log.id,
                  log.loggedAt,
                  Number(log.project.id),
                  Number(log.issue.id),
                )
              "
            >
              <i class="mdi mdi-pencil font-size-18"></i>
            </span>
            <span
              class="text-danger btn-pointer"
              @click="onDeleteWorkingTimeLog(log.id)"
            >
              <i class="mdi mdi-delete font-size-18"></i>
            </span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <WorkingTimelogModal
    ref="modalWorkingTimelog"
    :project-options="projectOptions"
    @reinit="showModal()"
    @refetch="$emit('refetch')"
  />

  <Pagination
    :meta="metadata"
    @change="$emit('onPageChange', $event)"
  ></Pagination>
</template>

<script setup>
import { ref, inject } from "vue";
import { destroyWorkingTimelog } from "@/apis/repositories";

const Swal = inject("Swal");

const emits = defineEmits(["onPageChange", "refetch"]);

defineProps({
  workingTimelogs: {
    type: Array,
    default: () => [],
  },
  metadata: {
    type: Object,
    default: () => {},
  },
  projectOptions: {
    type: Array,
    default: () => [],
  },
});

const modalWorkingTimelog = ref();

function onEdit(id, loggedAt, projectId, issueId) {
  modalWorkingTimelog.value.show({ id, loggedAt, projectId, issueId }, [
    "projectId",
    "issueId",
  ]);
}

async function onDeleteWorkingTimeLog(id) {
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
    emits("refetch");
  }
}
</script>

<style scoped>
.btn-pointer {
  cursor: pointer;
}
</style>
