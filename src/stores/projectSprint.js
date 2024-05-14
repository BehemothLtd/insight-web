import { defineStore } from "pinia";
import { ref } from "vue";

import { FetchProjectSprints } from "@/apis/repositories";

export const useProjectSprintStore = defineStore("project/Sprint", () => {
  const sprints = ref([]);

  const fetchProjectSprints = async function (projectId) {
    FetchProjectSprints(projectId).then((result) => {
      sprints.value = result.ProjectSprints;
    });
  };

  return {
    sprints,
    fetchProjectSprints,
  };
});
