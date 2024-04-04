import { ref, shallowRef } from "vue";

import TextInputField from "@/components/shared/searchFields/TextInputField.vue";
import SingleSelectField from "@/components/shared/searchFields/SingleSelectField.vue";
import DateRangeField from "@/components/shared/searchFields/DateRangeField.vue";
import MultipleSelectField from "@/components/shared/searchFields/MultipleSelectField.vue";
import DateField from "@/components/shared/searchFields/DateField.vue";

export default function useDynamicSearch() {
  const searchFieldsList = ref([]);

  const searchComponents = {
    TextInputField: shallowRef(TextInputField),
    SingleSelectField: shallowRef(SingleSelectField),
    DateRangeField: shallowRef(DateRangeField),
    MultipleSelectField: shallowRef(MultipleSelectField),
    DateField: shallowRef(DateField),
  };

  return {
    searchFieldsList,
    searchComponents,
  };
}
