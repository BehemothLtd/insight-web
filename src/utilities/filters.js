import moment from "moment";

export default {
  fullDate: (datetime) => {
    return datetime ? moment(datetime).format("YYYY/MM/DD") : "";
  },

  fullDateTime: (datetime) => {
    return datetime ? moment(datetime).format("YYYY/MM/DD HH:mm:ss") : "";
  },

  fullDateDay: (datetime) => {
    return datetime
      ? moment(new Date(datetime.replace(/-/g, "/"))).format("ddd, DD-MM-YYYY")
      : "";
  },

  truncateText: (text, length = 50, delimiters = "...") => {
    if (!text) return "";

    if (text.length < length) return text;

    return text.substring(0, length) + delimiters;
  },

  hoursWithMinutes: (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes}m`;
    } else if (remainingMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${remainingMinutes}m`;
    }
  },

  numberFormat(value) {
    if (!value) return value;

    let val = (value / 1).toFixed(0).replace(".", ",");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },

  formatTime(date) {
    if (!date) return "--";

    const parsedDate = moment(date, "YYYY-MM-DD HH:mm:ss Z");
    return parsedDate.format("hh:mm A");
  },

  convertBytes(bytes) {
    if (!bytes) return;
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;

    if (bytes < kilobyte) {
      return bytes + " Bytes";
    } else if (bytes < megabyte) {
      return (bytes / kilobyte).toFixed(2) + " KB";
    } else {
      return (bytes / megabyte).toFixed(2) + " MB";
    }
  },

  fullTime(date) {
    if (!date) return "--";

    const parsedDate = moment(date, "YYYY-MM-DD HH:mm:ss Z");
    return parsedDate.format("HH:mm:ss");
  },

  formatDate: (date) => {
    return date ? moment(date).format("YYYY-MM-DD") : "";
  },

  formatDateHourMinute: (date) => {
    return date ? moment(date).format("DD-MM-yyyy HH:mm") : "";
  },
};
