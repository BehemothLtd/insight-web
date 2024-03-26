import { useGlobalStore } from "@/stores/global";
const globalStore = useGlobalStore();

const defaultColor = "#6c757d";

export default function getColorByCodes(target, code) {
  const settingColorsCode = globalStore.colorsMapping;

  if (settingColorsCode && settingColorsCode[target]) {
    return settingColorsCode[target][code] || defaultColor;
  } else {
    return defaultColor;
  }
}
