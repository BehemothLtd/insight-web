<template>
  <div class="card">
    <div class="card-body">
      <form>
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <FormValidator
                name="StartDate"
                label="Start Date"
                required
              >
                <DatePicker
                  v-model="form.startDate"
                  :enable-time-picker="false"
                  model-type="dd-MM-yyyy"
                />
              </FormValidator>
            </div>
          </div>
        </div>

        <div class="mb-3">
          <FormValidator
            name="title"
            label="Title"
          >
            <input
              v-model="form.title"
              class="form-control"
            />
          </FormValidator>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
});
</script>
