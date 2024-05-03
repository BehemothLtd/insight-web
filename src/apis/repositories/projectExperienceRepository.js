import api from "@/apis/axios";

import {
  selfProjectExperiencesGQL,
  ProjectExperienceGQL,
} from "@/apis/resolvers";

import {
  SelfCreateProjectExperienceGQL,
  SelfUpdateProjectExperiencesGQL,
  SelfDestroyProjectExperiencesGQL,
} from "@/apis/mutations";

export function SelfFetchProjectExperiences(params = { input: {}, query: {} }) {
  return api(
    selfProjectExperiencesGQL,
    {
      input: params.input,
      query: params.query,
    },
    { loading: true },
  );
}

export function ShowProjectExperience(
  id,
  options = { loading: true, toast: false },
) {
  return api(ProjectExperienceGQL, { id }, options);
}

export function SelfCreateProjectExperience(
  { input },
  options = { loading: true, toast: false },
) {
  return api(SelfCreateProjectExperienceGQL, { input }, options);
}

export function SelfUpdateProjectExperience(
  { id, input },
  options = { loading: true, toast: false },
) {
  return api(SelfUpdateProjectExperiencesGQL, { id, input }, options);
}

export function SelfDestroyProjectExperience(
  id,
  options = { loading: true, toast: false },
) {
  return api(SelfDestroyProjectExperiencesGQL, { id }, options);
}
