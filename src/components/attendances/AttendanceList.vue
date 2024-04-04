<template>
  <div>
    <table class="table table-hover table-nowrap align-middle table-borderless">
      <thead v-if="showHeader">
        <tr>
          <th>Date</th>
          <th>Checkin at</th>
          <th>Checkout at</th>
        </tr>
      </thead>

      <tbody v-if="list.length">
        <tr
          v-for="item in list"
          :key="item.id"
        >
          <td>{{ filters.fullDate(item.checkinAt) }}</td>
          <td class="type">
            <span class="bg-checkin">
              <i class="fas fa-sign-in-alt"></i>
              {{ filters.formatTime(item.checkinAt) }}
            </span>
          </td>
          <td class="type">
            <span
              v-if="item.checkoutAt"
              class="bg-checkout"
            >
              <i class="fas fa-sign-out-alt"></i>
              {{ filters.formatTime(item.checkoutAt) }}
            </span>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td
            colspan="3"
            class="text-center"
          >
            No data
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  list: Array,
});
</script>

<style lang="scss" scoped>
th {
  background-color: #e0f2f8;
}

.type {
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
</style>
