export function setSelectedOption(options, value) {
  if (value.value === undefined) {
    const option = options.find((x) => x.value.toString() === value.label);
    return option.label;
  } else {
    return value.label;
  }
}
