import { DevicesStatusColorsMapping } from "@/constants";

const defaultColor = "#6c757d";

export default function getColorByCodes(target, code) {
  const targetMapping = {
    devices: DevicesStatusColorsMapping,
  };

  const targetColors = targetMapping[target];

  if (targetColors) {
    const targetColor = targetColors.find((item) => item.label === code);
    return targetColor ? targetColor.value : defaultColor;
  }

  return defaultColor;
}
