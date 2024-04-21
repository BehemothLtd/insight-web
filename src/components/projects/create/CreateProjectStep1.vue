<template>
  <div>
    <slot> </slot>

    <div class="form-group">
      <label for="projectname">Project Name</label>
      <FormValidator
        name="name"
        required
      >
        <input
          v-model="project.name"
          class="form-control"
          placeholder="Enter Project Name..."
        />
      </FormValidator>
    </div>

    <div class="form-group">
      <label for="projectcode">Project Code</label>
      <FormValidator
        name="code"
        required
      >
        <input
          v-model="project.code"
          class="form-control"
          placeholder="Enter Project Code..."
        />
      </FormValidator>
    </div>

    <div class="form-group">
      <label for="projectdesc">Project Description</label>
      <FormValidator
        name="description"
        required
      >
        <textarea
          v-model="project.description"
          rows="8"
          class="form-control"
          placeholder="Enter Project Description..."
        ></textarea>
      </FormValidator>
    </div>
  </div>
</template>

<script setup>
const project = defineModel();
</script>

<style>
.form-group {
  margin-bottom: 20px;
}
textarea {
  resize: none;
}
</style>
