/**
 * Task Manager App - Google Apps Script backend
 */

const SHEET_NAME = 'Tasks';
const HEADER_ROW = ['ID', 'Task', 'Status', 'Created', 'Completed'];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Task Manager')
    .addItem('Open App', 'showSidebar')
    .addItem('Setup Sheet', 'setup')
    .addToUi();
}

function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Task Manager');
  SpreadsheetApp.getUi().showSidebar(html);
}

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('Task Manager');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  sheet.clear();
  sheet.appendRow(HEADER_ROW);
}

function getTasks() {
  const sheet = getSheet_();
  const data = sheet.getDataRange().getValues();
  const tasks = [];
  for (let i = 1; i < data.length; i++) {
    const [id, task, status, created, completed] = data[i];
    tasks.push({ id, task, status, created, completed });
  }
  return tasks;
}

function addTask(taskText) {
  const sheet = getSheet_();
  const id = Utilities.getUuid();
  const created = new Date();
  sheet.appendRow([id, taskText, 'OPEN', created, '']);
  return id;
}

function updateTaskStatus(id, newStatus) {
  const sheet = getSheet_();
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      sheet.getRange(i + 1, 3).setValue(newStatus);
      if (newStatus === 'DONE') {
        sheet.getRange(i + 1, 5).setValue(new Date());
      } else {
        sheet.getRange(i + 1, 5).setValue('');
      }
      return true;
    }
  }
  return false;
}

function deleteTask(id) {
  const sheet = getSheet_();
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
  return false;
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADER_ROW);
  }
  return sheet;
}