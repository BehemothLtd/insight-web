<template>
  <div class="table-responsive">
    <table
      class="table table-hover project-list-table table-nowrap align-middle table-borderless"
    >
      <thead class="thead-light">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Full Name</th>
          <th scope="col">SlackID</th>
          <th scope="col">Active</th>
          <th scope="col">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
        >
          <td>
            <div class="d-flex align-items-center">
              <div class="mr-3">
                <UserAvatar :user="user"></UserAvatar>
              </div>
              <router-link
                :to="`/users/${user.id}`"
                class="text-dark font-size-14"
              >
                {{ user.name }}

                <br />
                <BadgeLabel
                  v-if="user.companyLevel"
                  :text="user.companyLevel?.title"
                  :color="user.companyLevel?.color"
                  icon="bx bx-trending-up"
                  :extra-classes="['mt-1 ml-1']"
                ></BadgeLabel>
              </router-link>
            </div>
          </td>
          <td class="align-middle">{{ user.email }}</td>
          <td class="align-middle">{{ user.fullName }}</td>
          <td class="align-middle">{{ user.slackId }}</td>
          <td>
            <div
              v-if="writePermission"
              class="form-check form-switch form-switch-lg"
            >
              <input
                v-model="user.state"
                true-value="active"
                false-value="inactive"
                class="form-check-input"
                type="checkbox"
                role="switch"
                @change="
                  $emit('activeToggle', {
                    value: $event.target.checked,
                    id: user.id,
                  })
                "
              />
            </div>

            <div v-else>{{ user.state }}</div>
          </td>
          <td>
            <ul class="list-inline font-size-20 contact-links mb-0">
              <li class="list-inline-item px-2">
                <router-link
                  v-b-tooltip.hover
                  :to="`/users/${user.id}`"
                  title="Profile"
                >
                  <i class="mdi mdi-pencil font-size-18"></i>
                </router-link>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  users: {
    type: Array,
    required: true,
  },
  writePermission: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
