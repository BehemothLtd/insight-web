import api from "@/apis/axios";

export function Upload(filesData) {
  return api(
    null,
    { data: filesData },
    {
      loading: true,
      toastMessage: "Upload Successfully",
      requestType: "upload",
    },
  );
}
