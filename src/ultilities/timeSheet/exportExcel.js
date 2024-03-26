import { utils, writeFile } from "xlsx-js-style";
import moment from "moment";
import _ from "lodash";

export function exportExcel(usersList, projectsList) {
  const FONT_SIZE = 14;
  const FONT_FAMILY = "Times New Roman";
  const MEMBER_START_ROW = 2;
  const MEMBER_END_ROW = MEMBER_START_ROW + usersList.length - 1;

  const MEMBER_ROLE_COLUMN = "B";
  const TOTAL_SUM_COLUMN = "C";
  const PROJECT_START_COLUMN = getExcelColumnLabelAfterPosition(
    TOTAL_SUM_COLUMN,
    1,
  );
  const PROJECT_END_COLUMN = getExcelColumnLabelAfterPosition(
    PROJECT_START_COLUMN,
    projectsList.length - 1,
  );

  let workbook = utils.book_new();

  let worksheet_data = document.getElementById("timesheet");

  let worksheet = utils.table_to_sheet(worksheet_data);

  let companyLevels = usersList
    .map((user) => user.companyLevel)
    .filter((companyLevel) => companyLevel);
  let sumRowStartNum = MEMBER_END_ROW + 1; // START NUM OF SUM ROWS

  companyLevels = _.uniqBy(companyLevels, (level) => level.code);

  const SUM_ROWS = companyLevels.reduce((accumulator, level) => {
    accumulator[level.code] = {
      title: level.title,
      rowNum: sumRowStartNum++,
      rowRange: getRangeOfCompanyLevel(level.code),
    };

    return accumulator;
  }, {});

  SUM_ROWS["total"] = {
    title: "Total",
    rowNum: sumRowStartNum++,
    rowRange: [MEMBER_START_ROW, MEMBER_END_ROW],
  };

  setTotalColumnFormular();

  for (const key in SUM_ROWS) {
    utils.sheet_add_aoa(worksheet, [[SUM_ROWS[key].title]], { origin: -1 });

    const rowRange = SUM_ROWS[key].rowRange;
    const rowNum = SUM_ROWS[key].rowNum;

    setRoleSummaryFomular(rowRange, rowNum);
    setProjectSummaryFomular(rowRange, rowNum);
  }

  setFontSize();
  setColor();

  worksheet["!cols"] = [{ width: 50 }];

  workbook.SheetNames.push("TimeSheet");
  workbook.Sheets["TimeSheet"] = worksheet;

  return writeFile(
    workbook,
    `TIMESHEET-${moment().format("YYYY--MM--DD")}.xlsx`,
  );

  // =========== SET FORMULAR FOR TOTAL COLUMN ====================
  function setTotalColumnFormular() {
    for (
      let i = MEMBER_START_ROW;
      i < usersList.length + MEMBER_START_ROW;
      i++
    ) {
      const cellAddress = `${TOTAL_SUM_COLUMN}${i}`;

      const startCell = `${PROJECT_START_COLUMN}${i}`;
      const endCell = `${PROJECT_END_COLUMN}${i}`;

      worksheet[cellAddress] = { t: "n", f: `SUM(${startCell}:${endCell})` };
    }
  }

  // =========== SET VALUES FOR SUM ROW ====================
  function setProjectSummaryFomular(rowRange, cellRow) {
    // ================== BUILD FORMULAR FOR PROJECT HOURS SUMMARY =========================
    for (
      let currentColumn = TOTAL_SUM_COLUMN;
      compareExcelColumns(currentColumn, PROJECT_END_COLUMN) <= 0;
      currentColumn = getNextExcelColumnLabel(currentColumn)
    ) {
      const cellAddress = `${currentColumn}${cellRow}`;

      if (rowRange[0] == -1 || rowRange[0] == -1) {
        worksheet[cellAddress] = { t: "n", v: 0 };
        continue;
      }

      const startCell = `${currentColumn}${rowRange[0]}`;
      const endCell = `${currentColumn}${rowRange[1]}`;

      worksheet[cellAddress] = { t: "n", f: `SUM(${startCell}:${endCell})` };
    }
  }

  function setRoleSummaryFomular(rowRange, cellRow) {
    // ================== BUILD ROLE SUMMARY ==============================================
    const cellAddress = `${MEMBER_ROLE_COLUMN}${cellRow}`;

    const startCell = `${MEMBER_ROLE_COLUMN}${rowRange[0]}`;
    const endCell = `${MEMBER_ROLE_COLUMN}${rowRange[1]}`;

    worksheet[cellAddress] = {
      t: "n",
      f: `COUNTIF(${startCell}:${endCell};"<>"&"")`,
    };
  }

  // ============ GET RANGE OF USER COMPANY LEVEL ==============
  function getRangeOfCompanyLevel(key) {
    const firstIndex = _.findIndex(usersList, (user) => {
      if (!user.companyLevel) return false;
      return user.companyLevel.code == key;
    });

    const lastIndex = _.findLastIndex(usersList, (user) => {
      if (!user.companyLevel) return false;
      return user.companyLevel.code == key;
    });

    const firstRow =
      firstIndex == -1 ? firstIndex : firstIndex + MEMBER_START_ROW;
    const lastRow = lastIndex == -1 ? lastIndex : lastIndex + MEMBER_START_ROW;

    return [firstRow, lastRow];
  }

  function setColor() {
    // ================== FIRST ROW =====================
    const firstRange = utils.decode_range(`A1:${PROJECT_END_COLUMN}1`);

    setStyle(
      {
        fill: { fgColor: { rgb: "32CD32" } },
        font: { name: FONT_FAMILY, bold: true, sz: FONT_SIZE },
      },
      firstRange,
    );

    // ================== TOTAL SUM COLUMN =====================
    const totalSumRange = utils.decode_range(
      `${TOTAL_SUM_COLUMN}${MEMBER_START_ROW}:${TOTAL_SUM_COLUMN}${MEMBER_END_ROW}`,
    );

    setStyle(
      {
        font: {
          name: FONT_FAMILY,
          bold: true,
          sz: FONT_SIZE,
          color: { rgb: "0000FF" },
        },
        color: { rgb: "0000FF" },
      },
      totalSumRange,
    );

    // ================== COMPANY LEVEL ===================
    for (const level of companyLevels) {
      const rangeRow = getRangeOfCompanyLevel(level.code);

      const start = rangeRow[0];
      const end = rangeRow[1];
      const range = utils.decode_range(`A${start}:A${end}`);

      setStyle(
        {
          fill: { fgColor: { rgb: hexToRgb(level.color) } },
          font: { name: FONT_FAMILY, bold: true, sz: FONT_SIZE },
        },
        range,
      );
    }

    // =================== SUM AREA =======================
    const sumRange = utils.decode_range(
      `A${MEMBER_END_ROW + 1}:${PROJECT_END_COLUMN}${sumRowStartNum}`,
    );

    setStyle(
      {
        fill: { fgColor: { rgb: "E9E9E9" } },
        font: { name: FONT_FAMILY, bold: true, sz: FONT_SIZE },
      },
      sumRange,
    );
  }

  function setFontSize() {
    const range = utils.decode_range(
      `A1:${PROJECT_END_COLUMN}${sumRowStartNum}`,
    );

    setStyle({ font: { name: FONT_FAMILY, sz: FONT_SIZE } }, range);
  }

  function setStyle(style, range) {
    for (let row = range.s.r; row <= range.e.r; ++row) {
      for (let col = range.s.c; col <= range.e.c; ++col) {
        const cellAddress = utils.encode_cell({ r: row, c: col });
        const cell = worksheet[cellAddress];

        if (cell) {
          if (cell.s) cell.s = _.merge(style);
          else cell.s = style;
        }
      }
    }
  }
}

// ================= COMPARE ORDER OF EXCEL COLUMN ================
function compareExcelColumns(column1, column2) {
  const num1 = getColumnNumber(column1);
  const num2 = getColumnNumber(column2);

  return num1 - num2;
}

// ================= GET EXCEL COLUMN NUMBER ============================
function getColumnNumber(column) {
  let num = 0;

  for (let i = 0; i < column.length; i++) {
    num = num * 26 + (column.charCodeAt(i) - 64);
  }

  return num;
}

// ================ GET EXCEL COLUMN AFTER SPECIFIC POSITION ==========
function getExcelColumnLabelAfterPosition(startColumn, position) {
  let num = 0;

  for (let i = 0; i < startColumn.length; i++) {
    num = num * 26 + (startColumn.charCodeAt(i) - 64);
  }

  num += position;

  let nextLabel = "";
  while (num > 0) {
    let remainder = (num - 1) % 26;
    nextLabel = String.fromCharCode(65 + remainder) + nextLabel;
    num = Math.floor((num - remainder) / 26);
  }

  return nextLabel;
}

// =============== GET NEXT EXCEL COLUMN LABEL ======================
function getNextExcelColumnLabel(currentLabel) {
  let num = 0;

  for (let i = 0; i < currentLabel.length; i++) {
    num = num * 26 + (currentLabel.charCodeAt(i) - 64);
  }

  num++;

  let nextLabel = "";
  while (num > 0) {
    let remainder = (num - 1) % 26;
    nextLabel = String.fromCharCode(65 + remainder) + nextLabel;
    num = Math.floor((num - remainder) / 26);
  }

  return nextLabel;
}

function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");

  const bigint = parseInt(hex, 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  const rgbString = `${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

  return rgbString.toUpperCase();
}

export function filterRecordBySetting(form, list, field, mode = "active") {
  if (!form.settings || !form.settings[field].length) {
    if (mode == "active") return list;
    else return [];
  }

  const settings = form.settings[field];

  if (mode == "active") {
    return settings.map((id) => list.find((item) => item.id == id));
  }

  return list.filter((record) => !settings.includes(record.id));
}
