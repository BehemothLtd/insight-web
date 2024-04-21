<template>
  <div class="table-responsive">
    <table
      class="table table-hover project-list-table align-middle table-borderless"
    >
      <thead class="thead-light">
        <tr>
          <th style="width: 5%"></th>
          <th style="width: 20%">Projects</th>
          <th style="width: 50%">Description</th>
          <th scope="col">Members</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="project in projects"
          :key="project.id"
          class="cursor-pointer"
          @click="$router.push(`/projects/${project.id}`)"
        >
          <td>
            <ProjectAvatar
              v-if="project"
              :project="project"
            />
          </td>
          <td>
            <h5 class="text-truncate font-size-14">
              {{ project.name }}
            </h5>

            <BadgeLabel
              v-if="project.projectType"
              :text="project.projectType"
              :extra-classes="['mt-1  p-2 text-capitalize']"
              color="pink"
            ></BadgeLabel>

            <BadgeLabel
              v-if="project.projectPriority"
              :text="project.projectPriority"
              :extra-classes="['mt-1 ml-2 p-2 text-capitalize']"
              :color="projectPriorityColor(project)"
            ></BadgeLabel>

            <BadgeLabel
              v-if="project.state"
              :text="project.state"
              :extra-classes="['mt-1 ml-2 p-2 text-capitalize']"
              :color="project.state == 'active' ? 'green' : 'gray'"
            ></BadgeLabel>
          </td>

          <td>
            <p class="text-truncate text-muted">
              {{ filters.truncateText(project.description) }}
            </p>
          </td>

          <td>
            <div class="avatar-group-item">
              <ProjectMembers :project="project"></ProjectMembers>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  projects: {
    type: Array,
    require: true,
    default: () => [],
  },
});

function projectPriorityColor(project) {
  let color = null;

  switch (project.projectPriority) {
    case "low":
      color = "yellow";
      break;
    case "medium":
      color = "blue";
      break;
    case "high":
      color = "red";
      break;
    default:
      break;
  }

  return color;
}
</script>

<style lang="scss" scoped>
table {
  td {
    vertical-align: middle;
    p {
      margin-bottom: 0;
    }
  }
}
</style>
