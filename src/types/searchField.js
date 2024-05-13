export default class SearchField {
  constructor(
    title,
    ransacker,
    icon,
    component,
    options = new SearchFieldOptions(),
    classes,
    defaultValue = null,
  ) {
    this.title = title;
    this.icon = icon;
    this.ransacker = ransacker;
    this.component = component;
    this.options = options;
    this.classes = classes;
    this.defaultValue = defaultValue;
  }
}

class SearchFieldOptions {
  constructor({
    selectOptions = [],
    dateRangeDefault = [],
    defaultOptions = [],
    classes = null,
  } = {}) {
    this.selectOptions = selectOptions;
    this.dateRangeDefault = dateRangeDefault;
    this.classes = classes;
    this.defaultOptions = defaultOptions;
  }
}
