<template>
  <div class="table-responsive">
    <table
      class="table table-hover project-list-table table-nowrap align-middle table-borderless"
    >
      <thead class="table-light">
        <tr>
          <th
            width="10%"
            class="align-middle"
          >
            ID
          </th>
          <th class="text-left">Name</th>
          <th class="text-left">Show on home page</th>
          <th
            v-if="writePermission || deletePermission"
            class="align-middle"
            width="30%"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="client in clients"
          :key="client.id"
        >
          <td>{{ client.id }}</td>
          <td class="text-left">
            <div class="d-flex">
              <UserAvatarUpload
                class="mr-3"
                :user="client"
                :permission="false"
                avatar-size="avatar-sm"
              />

              {{ client.name }}
            </div>
          </td>
          <td class="text-left">{{ client.showOnHomePage ? "Yes" : "No" }}</td>
          <td v-if="writePermission || deletePermission">
            <div class="d-flex gap-3">
              <span
                v-if="writePermission"
                class="text-success cursor-pointer"
                @click="$emit('open-detail', client.id)"
              >
                <i class="mdi mdi-pencil font-size-18"></i>
              </span>
              <span
                v-if="deletePermission"
                href="javascript:void(0);"
                class="text-danger cursor-pointer"
                @click="$emit('delete', client.id)"
              >
                <i class="mdi mdi-delete font-size-18"></i>
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from "vue";

defineProps({
  clients: {
    type: Array,
    required: true,
  },
});

defineEmits(["open-detail", "delete"]);
// ===========PERMISSION========
// const hasPermissionOn = inject("hasPermissionOn");

// const writePermission = computed(() => hasPermissionOn("clients", "write"));

// const deletePermission = computed(() => hasPermissionOn("clients", "delete"));

const writePermission = computed(() => true);

const deletePermission = computed(() => true);
</script>
