<template>
  <div>
    <slot> </slot>

    <div class="table-container">
      <table class="table b-table">
        <thead>
          <tr class="thead-light">
            <th>User</th>
            <th>Development Role</th>
            <th>Active</th>
            <th>Joined Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(attribute, index) in projectAssigneesAttributes"
            :key="index"
          >
            <td>
              <FormValidator
                :name="`project_assignees_attributes.${index}.user_id`"
                required
              >
                <el-select-v2
                  v-model="attribute.userId"
                  filterable
                  clearable
                  :options="selectOptions.users"
                ></el-select-v2>
              </FormValidator>
            </td>
            <td>
              <FormValidator
                :name="`project_assignees_attributes.${index}.development_role_id`"
                required
              >
                <el-select-v2
                  v-model="attribute.developmentRoleId"
                  filterable
                  clearable
                  :options="selectOptions.developmentRoles"
                ></el-select-v2>
              </FormValidator>
            </td>
            <td>
              <FormValidator
                :name="`project_assignees_attributes.${index}.active`"
                required
              >
                <div class="form-check form-switch form-switch-lg mb-3">
                  <input
                    v-model="attribute.active"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="true"
                    :false-value="false"
                  />
                </div>
              </FormValidator>
            </td>
            <td>
              <FormValidator
                :name="`project_assignees_attributes.${index}.join_date`"
                required
              >
                <DatePicker
                  v-model="attribute.joinDate"
                  :enable-time-picker="false"
                />
              </FormValidator>
            </td>
            <td style="text-align: center">
              <i
                class="mdi mdi-delete ml-2 text-danger"
                style="font-size: 24px; float: left; cursor: pointer"
                @click="deleteRow(index)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
      <i
        class="btn btn-secondary ml-2 mdi mdi-account-multiple-plus"
        style="font-size: 15px; float: left; cursor: pointer"
        @click="addRow"
      />
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";

const project = defineModel();

const projectAssigneesAttributes = computed(
  () => project.value.projectAssigneesAttributes,
);

function addRow() {
  projectAssigneesAttributes.value.push({
    userId: null,
    developmentRoleId: null,
    active: false,
    joinDate: new Date(),
  });
}

function deleteRow(index) {
  projectAssigneesAttributes.value.splice(index, 1);
}
</script>

<style lang="scss" scoped>
.table-container {
  height: calc(45vh - 120px);
  min-height: 400px;
  overflow-y: auto;
  .table thead {
    position: sticky;
    top: 0;
    z-index: 1;
  }
}
</style>
