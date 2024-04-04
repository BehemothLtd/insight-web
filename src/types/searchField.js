export default class SearchField {
  constructor(
    title,
    ransacker,
    icon,
    component,
    options = new SearchFieldOptions(),
    classes,
  ) {
    this.title = title;
    this.icon = icon;
    this.ransacker = ransacker;
    this.component = component;
    this.options = options;
    this.classes = classes;
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
