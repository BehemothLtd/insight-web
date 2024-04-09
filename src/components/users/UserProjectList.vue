<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title mb-4">My Projects</h4>
      <div class="table-responsive mb-0">
        <table class="table table-nowrap table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Project Name</th>
              <th scope="col">Development Role</th>
              <th scope="col">Join Date</th>
              <th scope="col">Leave Date</th>
              <th scope="col">Active</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(projectAssignee, index) in projectAssignees"
              :key="projectAssignee.id"
            >
              <th scope="row">
                {{ index + 1 }}
              </th>
              <td>{{ projectAssignee.project.name }}</td>
              <td>
                <div>
                  <a
                    href="javascript: void(0);"
                    class="badge bg-primary rounded-pill bg-soft text-primary font-size-11"
                  >
                    {{ projectAssignee.title }}
                  </a>
                </div>
              </td>
              <td>{{ projectAssignee.joinDate }}</td>
              <td>{{ projectAssignee.leaveDate }}</td>
              <td>
                <span
                  class="badge me-2"
                  :class="[
                    projectAssignee.active ? 'bg-success' : 'bg-secondary',
                    'badge',
                  ]"
                >
                  {{ projectAssignee.active }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  projectAssignees: {
    type: Object,
    default: () => {},
  },
});
</script>
