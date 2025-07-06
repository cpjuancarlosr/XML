/**
 * Project Task Manager - Google Apps Script
 * A comprehensive task management system integrated with Google Sheets
 * 
 * Features:
 * - Task creation and management
 * - Automatic email notifications
 * - Custom functions for sheets
 * - Data validation and formatting
 * - Dashboard and reporting
 * - Web app interface
 */

// Configuration constants
const CONFIG = {
  SHEET_NAMES: {
    TASKS: 'Tasks',
    PROJECTS: 'Projects',
    DASHBOARD: 'Dashboard',
    SETTINGS: 'Settings'
  },
  COLUMNS: {
    TASKS: {
      ID: 'A',
      TITLE: 'B',
      DESCRIPTION: 'C',
      PROJECT: 'D',
      ASSIGNEE: 'E',
      PRIORITY: 'F',
      STATUS: 'G',
      DUE_DATE: 'H',
      CREATED_DATE: 'I',
      COMPLETED_DATE: 'J',
      ESTIMATED_HOURS: 'K',
      ACTUAL_HOURS: 'L'
    }
  },
  STATUS_OPTIONS: ['Not Started', 'In Progress', 'Completed', 'On Hold', 'Cancelled'],
  PRIORITY_OPTIONS: ['Low', 'Medium', 'High', 'Critical']
};

/**
 * Initial setup function - run this once to set up the sheets
 */
function setupTaskManager() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create sheets if they don't exist
  createSheetsIfNotExist(ss);
  
  // Set up the Tasks sheet
  setupTasksSheet(ss);
  
  // Set up the Projects sheet
  setupProjectsSheet(ss);
  
  // Set up the Dashboard sheet
  setupDashboardSheet(ss);
  
  // Set up the Settings sheet
  setupSettingsSheet(ss);
  
  // Install triggers
  installTriggers();
  
  SpreadsheetApp.getUi().alert('Task Manager setup complete!');
}

/**
 * Create sheets if they don't exist
 */
function createSheetsIfNotExist(ss) {
  Object.values(CONFIG.SHEET_NAMES).forEach(sheetName => {
    if (!ss.getSheetByName(sheetName)) {
      ss.insertSheet(sheetName);
    }
  });
}

/**
 * Set up the Tasks sheet with headers and formatting
 */
function setupTasksSheet(ss) {
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.TASKS);
  
  // Clear existing content
  sheet.clear();
  
  // Set headers
  const headers = [
    'Task ID', 'Title', 'Description', 'Project', 'Assignee', 
    'Priority', 'Status', 'Due Date', 'Created Date', 'Completed Date',
    'Estimated Hours', 'Actual Hours'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#4285F4')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');
  
  // Set column widths
  sheet.setColumnWidth(1, 80);  // Task ID
  sheet.setColumnWidth(2, 200); // Title
  sheet.setColumnWidth(3, 300); // Description
  sheet.setColumnWidth(4, 150); // Project
  sheet.setColumnWidth(5, 150); // Assignee
  sheet.setColumnWidth(6, 100); // Priority
  sheet.setColumnWidth(7, 120); // Status
  sheet.setColumnWidth(8, 120); // Due Date
  sheet.setColumnWidth(9, 120); // Created Date
  sheet.setColumnWidth(10, 120); // Completed Date
  sheet.setColumnWidth(11, 120); // Estimated Hours
  sheet.setColumnWidth(12, 120); // Actual Hours
  
  // Add data validation for Priority and Status columns
  setupDataValidation(sheet);
  
  // Freeze header row
  sheet.setFrozenRows(1);
}

/**
 * Set up data validation for dropdown columns
 */
function setupDataValidation(sheet) {
  // Priority validation (column F)
  const priorityValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(CONFIG.PRIORITY_OPTIONS)
    .build();
  sheet.getRange('F:F').setDataValidation(priorityValidation);
  
  // Status validation (column G)
  const statusValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(CONFIG.STATUS_OPTIONS)
    .build();
  sheet.getRange('G:G').setDataValidation(statusValidation);
}

/**
 * Set up the Projects sheet
 */
function setupProjectsSheet(ss) {
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.PROJECTS);
  sheet.clear();
  
  const headers = ['Project ID', 'Project Name', 'Description', 'Start Date', 'End Date', 'Status', 'Manager'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#34A853')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');
  
  sheet.setFrozenRows(1);
}

/**
 * Set up the Dashboard sheet with summary information
 */
function setupDashboardSheet(ss) {
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.DASHBOARD);
  sheet.clear();
  
  // Dashboard title
  sheet.getRange('A1').setValue('Task Management Dashboard').setFontSize(18).setFontWeight('bold');
  
  // Summary statistics headers
  sheet.getRange('A3').setValue('Summary Statistics').setFontWeight('bold').setFontSize(14);
  
  const summaryLabels = [
    'Total Tasks:',
    'Completed Tasks:',
    'In Progress Tasks:',
    'Overdue Tasks:',
    'High Priority Tasks:'
  ];
  
  sheet.getRange('A5:A9').setValues(summaryLabels.map(label => [label]));
  
  // Add formulas for summary statistics
  const summaryFormulas = [
    ['=COUNTA(Tasks!B:B)-1'],  // Total tasks (excluding header)
    ['=COUNTIF(Tasks!G:G,"Completed")'],  // Completed tasks
    ['=COUNTIF(Tasks!G:G,"In Progress")'],  // In progress tasks
    ['=SUMPRODUCT((Tasks!H:H<TODAY())*(Tasks!G:G<>"Completed")*(Tasks!H:H<>""))'],  // Overdue tasks
    ['=COUNTIF(Tasks!F:F,"High")+COUNTIF(Tasks!F:F,"Critical")']  // High priority tasks
  ];
  
  sheet.getRange('B5:B9').setValues(summaryFormulas);
  
  // Chart area
  sheet.getRange('D3').setValue('Task Status Distribution').setFontWeight('bold').setFontSize(14);
}

/**
 * Set up the Settings sheet
 */
function setupSettingsSheet(ss) {
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.SETTINGS);
  sheet.clear();
  
  sheet.getRange('A1').setValue('Task Manager Settings').setFontSize(18).setFontWeight('bold');
  
  const settings = [
    ['Setting', 'Value', 'Description'],
    ['Email Notifications', 'TRUE', 'Enable/disable email notifications'],
    ['Notification Email', 'your-email@example.com', 'Email address for notifications'],
    ['Due Date Warning Days', '3', 'Days before due date to send warning'],
    ['Auto Archive Completed', 'FALSE', 'Automatically archive completed tasks']
  ];
  
  sheet.getRange(3, 1, settings.length, settings[0].length).setValues(settings);
  
  // Format header row
  sheet.getRange('A3:C3').setBackground('#EA4335').setFontColor('white').setFontWeight('bold');
}

/**
 * Custom function to create a new task
 */
function createTask(title, description, project, assignee, priority, dueDate, estimatedHours) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.TASKS);
  
  // Generate task ID
  const taskId = generateTaskId();
  
  // Get next empty row
  const lastRow = sheet.getLastRow();
  const newRow = lastRow + 1;
  
  // Create task data
  const taskData = [
    taskId,
    title,
    description || '',
    project || '',
    assignee || '',
    priority || 'Medium',
    'Not Started',
    dueDate || '',
    new Date(),
    '',
    estimatedHours || 0,
    0
  ];
  
  // Add task to sheet
  sheet.getRange(newRow, 1, 1, taskData.length).setValues([taskData]);
  
  // Format the new row
  formatTaskRow(sheet, newRow);
  
  // Send notification if enabled
  sendTaskNotification('created', taskData);
  
  return taskId;
}

/**
 * Generate a unique task ID
 */
function generateTaskId() {
  const timestamp = new Date().getTime();
  return 'TASK-' + timestamp.toString().slice(-8);
}

/**
 * Format a task row based on priority and status
 */
function formatTaskRow(sheet, row) {
  const range = sheet.getRange(row, 1, 1, 12);
  const priority = sheet.getRange(row, 6).getValue();
  const status = sheet.getRange(row, 7).getValue();
  
  // Color coding based on priority
  let backgroundColor = '#FFFFFF';
  if (priority === 'Critical') {
    backgroundColor = '#FFE6E6';
  } else if (priority === 'High') {
    backgroundColor = '#FFF2E6';
  } else if (priority === 'Medium') {
    backgroundColor = '#E6F3FF';
  } else if (priority === 'Low') {
    backgroundColor = '#F0F8F0';
  }
  
  range.setBackground(backgroundColor);
  
  // Strike through completed tasks
  if (status === 'Completed') {
    range.setFontLine('line-through');
  } else {
    range.setFontLine('none');
  }
}

/**
 * Update task status and handle completion logic
 */
function updateTaskStatus(taskId, newStatus) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.TASKS);
  
  // Find the task row
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === taskId) {
      // Update status
      sheet.getRange(i + 1, 7).setValue(newStatus);
      
      // If completed, set completion date
      if (newStatus === 'Completed') {
        sheet.getRange(i + 1, 10).setValue(new Date());
      } else {
        sheet.getRange(i + 1, 10).setValue('');
      }
      
      // Format the row
      formatTaskRow(sheet, i + 1);
      
      // Send notification
      sendTaskNotification('updated', data[i]);
      break;
    }
  }
}

/**
 * Send email notifications for task events
 */
function sendTaskNotification(eventType, taskData) {
  const settingsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAMES.SETTINGS);
  const settings = getSettings(settingsSheet);
  
  if (!settings.emailNotifications || !settings.notificationEmail) {
    return;
  }
  
  const [taskId, title, description, project, assignee, priority, status] = taskData;
  
  let subject = '';
  let body = '';
  
  switch (eventType) {
    case 'created':
      subject = `New Task Created: ${title}`;
      body = `A new task has been created:\n\nTask ID: ${taskId}\nTitle: ${title}\nProject: ${project}\nAssignee: ${assignee}\nPriority: ${priority}\nStatus: ${status}`;
      break;
    case 'updated':
      subject = `Task Updated: ${title}`;
      body = `Task ${taskId} has been updated:\n\nTitle: ${title}\nNew Status: ${status}\nAssignee: ${assignee}\nPriority: ${priority}`;
      break;
    case 'due_soon':
      subject = `Task Due Soon: ${title}`;
      body = `Task ${taskId} is due soon:\n\nTitle: ${title}\nDue Date: ${taskData[7]}\nAssignee: ${assignee}\nPriority: ${priority}`;
      break;
  }
  
  try {
    MailApp.sendEmail(settings.notificationEmail, subject, body);
  } catch (error) {
    console.log('Failed to send email notification:', error);
  }
}

/**
 * Get settings from the Settings sheet
 */
function getSettings(settingsSheet) {
  const data = settingsSheet.getDataRange().getValues();
  const settings = {};
  
  for (let i = 4; i < data.length; i++) {
    const [setting, value] = data[i];
    switch (setting) {
      case 'Email Notifications':
        settings.emailNotifications = value === 'TRUE';
        break;
      case 'Notification Email':
        settings.notificationEmail = value;
        break;
      case 'Due Date Warning Days':
        settings.dueDateWarningDays = parseInt(value) || 3;
        break;
      case 'Auto Archive Completed':
        settings.autoArchiveCompleted = value === 'TRUE';
        break;
    }
  }
  
  return settings;
}

/**
 * Custom function to calculate task completion percentage
 */
function TASK_COMPLETION_RATE(projectName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.TASKS);
  const data = sheet.getDataRange().getValues();
  
  let totalTasks = 0;
  let completedTasks = 0;
  
  for (let i = 1; i < data.length; i++) {
    if (!projectName || data[i][3] === projectName) {
      totalTasks++;
      if (data[i][6] === 'Completed') {
        completedTasks++;
      }
    }
  }
  
  return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
}

/**
 * Custom function to get overdue tasks count
 */
function OVERDUE_TASKS_COUNT(projectName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.TASKS);
  const data = sheet.getDataRange().getValues();
  const today = new Date();
  
  let overdueCount = 0;
  
  for (let i = 1; i < data.length; i++) {
    const dueDate = data[i][7];
    const status = data[i][6];
    const project = data[i][3];
    
    if ((!projectName || project === projectName) && 
        dueDate && 
        new Date(dueDate) < today && 
        status !== 'Completed') {
      overdueCount++;
    }
  }
  
  return overdueCount;
}

/**
 * Trigger function to check for due dates and send notifications
 */
function checkDueDates() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.TASKS);
  const settingsSheet = ss.getSheetByName(CONFIG.SHEET_NAMES.SETTINGS);
  const settings = getSettings(settingsSheet);
  
  if (!settings.emailNotifications) {
    return;
  }
  
  const data = sheet.getDataRange().getValues();
  const today = new Date();
  const warningDate = new Date(today.getTime() + (settings.dueDateWarningDays * 24 * 60 * 60 * 1000));
  
  for (let i = 1; i < data.length; i++) {
    const dueDate = data[i][7];
    const status = data[i][6];
    
    if (dueDate && 
        new Date(dueDate) <= warningDate && 
        status !== 'Completed') {
      sendTaskNotification('due_soon', data[i]);
    }
  }
}

/**
 * Install time-driven triggers
 */
function installTriggers() {
  // Delete existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'checkDueDates') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Create new daily trigger for due date checking
  ScriptApp.newTrigger('checkDueDates')
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();
}

/**
 * On edit trigger to handle automatic formatting and calculations
 */
function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  
  // Only process if it's the Tasks sheet
  if (sheet.getName() !== CONFIG.SHEET_NAMES.TASKS) {
    return;
  }
  
  // Format the edited row
  formatTaskRow(sheet, range.getRow());
  
  // If status was changed to completed, set completion date
  if (range.getColumn() === 7 && range.getValue() === 'Completed') {
    sheet.getRange(range.getRow(), 10).setValue(new Date());
  }
}

/**
 * Web app function - returns HTML for the task management interface
 */
function doGet() {
  return HtmlService.createTemplateFromFile('TaskManagerUI')
    .evaluate()
    .setTitle('Task Manager')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Include HTML files in the web app
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Server function to get all tasks for the web interface
 */
function getTasks() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.TASKS);
  const data = sheet.getDataRange().getValues();
  
  // Convert to objects array (skip header row)
  return data.slice(1).map(row => ({
    taskId: row[0],
    title: row[1],
    description: row[2],
    project: row[3],
    assignee: row[4],
    priority: row[5],
    status: row[6],
    dueDate: row[7],
    createdDate: row[8],
    completedDate: row[9],
    estimatedHours: row[10],
    actualHours: row[11]
  }));
}

/**
 * Server function to create a task from the web interface
 */
function createTaskFromWeb(taskData) {
  return createTask(
    taskData.title,
    taskData.description,
    taskData.project,
    taskData.assignee,
    taskData.priority,
    taskData.dueDate,
    taskData.estimatedHours
  );
}

/**
 * Add sample data for demonstration
 */
function addSampleData() {
  const sampleTasks = [
    ['TASK-12345', 'Design new homepage', 'Create wireframes and mockups for the new homepage', 'Website Redesign', 'John Doe', 'High', 'In Progress', new Date(2024, 11, 30), new Date(), '', 8, 4],
    ['TASK-12346', 'Set up database', 'Configure PostgreSQL database for the new application', 'Backend Development', 'Jane Smith', 'Critical', 'Not Started', new Date(2024, 11, 25), new Date(), '', 12, 0],
    ['TASK-12347', 'Write API documentation', 'Document all REST API endpoints', 'Backend Development', 'Bob Johnson', 'Medium', 'Completed', new Date(2024, 11, 20), new Date(), new Date(), 6, 7],
    ['TASK-12348', 'User testing', 'Conduct usability testing with 5 users', 'Website Redesign', 'Alice Brown', 'Medium', 'On Hold', new Date(2024, 11, 28), new Date(), '', 10, 2]
  ];
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.TASKS);
  
  // Add sample data starting from row 2
  const startRow = sheet.getLastRow() + 1;
  sheet.getRange(startRow, 1, sampleTasks.length, sampleTasks[0].length).setValues(sampleTasks);
  
  // Format the new rows
  for (let i = 0; i < sampleTasks.length; i++) {
    formatTaskRow(sheet, startRow + i);
  }
  
  SpreadsheetApp.getUi().alert('Sample data added successfully!');
}