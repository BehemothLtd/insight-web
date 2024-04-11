import { some } from "lodash";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import Toast from "@/ultilities/toast";
import router from "@/router/index";

export default function usePermission() {
  const authStore = useAuthStore();
  const { permissions } = storeToRefs(authStore);

  function hasPermissionOn(target, action) {
    return some(permissions.value, (p) => {
      return p.Target == "all" || (p.Target == target && p.Action == action);
    });
  }

  function blockAccess() {
    Toast.error({ title: "you don't have permission to access this screen" });
    router.push("/");
  }

  return {
    hasPermissionOn,
    blockAccess,
  };
}
