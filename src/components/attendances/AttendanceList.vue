<template>
  <table
    class="table table-hover project-list-table table-nowrap align-middle table-borderless"
  >
    <thead>
      <tr>
        <th>Name</th>
        <th>Date</th>
        <th>Checkin at</th>
        <th>Checkout at</th>
        <th>Created at</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <template
        v-for="record in list"
        :key="record"
      >
        <tr>
          <td>
            <span>{{ record.user.name }}</span>
          </td>
          <td>
            {{ filters.formatDate(record.checkinAt) }}
          </td>
          <td>
            {{ filters.fullTime(record.checkinAt) }}
          </td>
          <td>
            {{ filters.fullTime(record.checkoutAt) }}
          </td>

          <td>
            {{ filters.fullDateTime(record.createdAt) }}
          </td>

          <td>
            <div class="d-flex gap-3">
              <button
                class="btn text-success cursor-pointer"
                :disabled="!writePermission"
                @click="$emit('detail', record.id)"
              >
                <i class="mdi mdi-pencil font-size-18"></i>
              </button>
              <button
                class="btn text-danger cursor-pointer"
                :disabled="!writePermission"
                @click="$emit('delete', record.id)"
              >
                <i class="mdi mdi-delete font-size-18"></i>
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
  writePermission: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["detail", "delete"]);
</script>
