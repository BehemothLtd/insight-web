import { defineStore } from "pinia";
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";

import { get } from "lodash";

export const useGlobalStore = defineStore("global", () => {
  const theme = ref(useLocalStorage("theme", "light"));

  const validationErrors = ref({});
  const errorMessage = ref("");
  const selectOptions = ref([]);
  const loadingRequests = ref([]);

  function getErrors(name) {
    return get(validationErrors.value, name, []);
  }

  function hasErrorOn(field) {
    const fieldError = validationErrors.value[field];

    if (fieldError) {
      return fieldError.length > 0;
    } else {
      return false;
    }
  }

  function haveErrorOnFields(fields) {
    for (const field of fields) {
      if (hasErrorOn(field)) {
        return true;
      }
    }

    return false;
  }

  function setErrorMessage(message) {
    errorMessage.value = message;
  }

  function setValidationErrors(value) {
    validationErrors.value = value;
  }

  function addLoadingRequest(id) {
    loadingRequests.value.push(id);
  }

  function removeLoadingRequest(id) {
    loadingRequests.value = loadingRequests.value.filter(
      (rq_id) => rq_id != id,
    );
  }

  return {
    theme,
    // Errors Msgs
    errorMessage,
    validationErrors,
    selectOptions,
    loadingRequests,

    // methods
    // uploadImages,
    setValidationErrors,
    getErrors,
    setErrorMessage,
    haveErrorOnFields,
    addLoadingRequest,
    removeLoadingRequest,
    uploadFiles
  };
});
