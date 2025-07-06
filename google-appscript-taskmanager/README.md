# 📋 Google Apps Script Task Manager

A comprehensive task management system built with Google Apps Script and Google Sheets, featuring a modern web interface, automated notifications, and powerful project tracking capabilities.

## 🌟 Features

### Core Functionality
- **Task Management**: Create, edit, update, and delete tasks with rich metadata
- **Project Organization**: Group tasks by projects with completion tracking
- **Priority System**: Four-level priority system (Low, Medium, High, Critical)
- **Status Tracking**: Five status options (Not Started, In Progress, Completed, On Hold, Cancelled)
- **Due Date Management**: Set and track due dates with overdue indicators
- **Time Tracking**: Estimated vs. actual hours tracking

### Automation & Notifications
- **Email Notifications**: Automatic notifications for task creation, updates, and due dates
- **Daily Due Date Checks**: Automated daily checks for upcoming due dates
- **Smart Formatting**: Automatic row formatting based on priority and status
- **Completion Tracking**: Automatic timestamp when tasks are completed

### Web Interface
- **Modern UI**: Beautiful, responsive web interface
- **Dashboard**: Real-time summary cards with key metrics
- **Advanced Filtering**: Filter by status, priority, project, or search terms
- **Task Details**: Detailed task view with all metadata
- **Mobile Responsive**: Works perfectly on mobile devices

### Reporting & Analytics
- **Custom Functions**: Built-in spreadsheet functions for reporting
- **Dashboard Formulas**: Automated summary statistics
- **Completion Rates**: Project and overall completion tracking
- **Overdue Tasks**: Automatic overdue task identification

## 🚀 Quick Setup

### 1. Create Google Sheets Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "Task Manager" or your preferred name

### 2. Open Apps Script Editor
1. In your spreadsheet, click **Extensions** → **Apps Script**
2. Delete the default `myFunction()` code
3. Copy and paste the contents of `Code.gs` into the editor
4. Save the project (Ctrl+S or Cmd+S)

### 3. Add HTML Files
1. In the Apps Script editor, click the **+** button next to "Files"
2. Choose **HTML** file type
3. Create three HTML files with these exact names:
   - `TaskManagerUI` (paste contents from `TaskManagerUI.html`)
   - `TaskManagerCSS` (paste contents from `TaskManagerCSS.html`)
   - `TaskManagerJS` (paste contents from `TaskManagerJS.html`)

### 4. Initial Setup
1. In the Apps Script editor, select the `setupTaskManager` function
2. Click the **Run** button (▶️)
3. Grant the necessary permissions when prompted
4. Wait for the "Task Manager setup complete!" alert

### 5. Configure Email Notifications (Optional)
1. Go to the "Settings" sheet in your spreadsheet
2. Update the "Notification Email" field with your email address
3. Set "Email Notifications" to "TRUE" if you want notifications

### 6. Deploy Web App (Optional)
1. In Apps Script editor, click **Deploy** → **New deployment**
2. Choose type: **Web app**
3. Set execute as: **Me**
4. Set access: **Anyone with Google account** (or more restrictive)
5. Click **Deploy** and copy the web app URL

## 📊 Sheet Structure

The application creates four sheets automatically:

### Tasks Sheet
- **Task ID**: Unique identifier for each task
- **Title**: Task name/title
- **Description**: Detailed task description
- **Project**: Project association
- **Assignee**: Person responsible for the task
- **Priority**: Low, Medium, High, or Critical
- **Status**: Not Started, In Progress, Completed, On Hold, or Cancelled
- **Due Date**: Task deadline
- **Created Date**: When the task was created
- **Completed Date**: When the task was completed
- **Estimated Hours**: Time estimate for completion
- **Actual Hours**: Actual time spent

### Projects Sheet
- Project tracking and management information

### Dashboard Sheet
- Summary statistics and key metrics
- Automated formulas for real-time reporting

### Settings Sheet
- Configuration options for notifications and automation

## 🔧 Usage Guide

### Creating Tasks

#### From the Web Interface
1. Open the web app URL (if deployed)
2. Click "➕ Add Task" button
3. Fill in the task details
4. Click "Save Task"

#### From Google Sheets
1. Go to the Tasks sheet
2. Use the `createTask()` function in Apps Script
3. Or manually add a row (not recommended - use the interface for proper formatting)

#### Using Apps Script Function
```javascript
createTask(
    "Task Title",           // title
    "Task Description",     // description  
    "Project Name",         // project
    "John Doe",            // assignee
    "High",                // priority
    new Date("2024-12-31"), // dueDate
    8                      // estimatedHours
);
```

### Managing Tasks

#### Update Task Status
- Use the web interface action buttons
- Or call `updateTaskStatus(taskId, newStatus)` function
- Or edit directly in the sheet (triggers automatic formatting)

#### Bulk Operations
- Use the Google Sheets interface for bulk edits
- Apply filters to work with specific task subsets
- Use custom functions for bulk calculations

### Custom Functions

The application provides custom functions you can use in your spreadsheet:

#### `TASK_COMPLETION_RATE(projectName)`
Returns the completion percentage for a project or all tasks.
```
=TASK_COMPLETION_RATE("Website Redesign")  // Project-specific
=TASK_COMPLETION_RATE()                    // All tasks
```

#### `OVERDUE_TASKS_COUNT(projectName)`
Returns the number of overdue tasks.
```
=OVERDUE_TASKS_COUNT("Website Redesign")   // Project-specific
=OVERDUE_TASKS_COUNT()                     // All tasks
```

## 🔔 Notification System

### Email Notifications
Configure email notifications in the Settings sheet:

- **Task Created**: Sent when a new task is created
- **Task Updated**: Sent when task status changes
- **Due Soon**: Sent for tasks approaching their due date

### Trigger Configuration
- Daily trigger runs at 9 AM to check for due dates
- Edit trigger runs automatically when sheet data changes
- Customize trigger timing in the `installTriggers()` function

## 🎨 Customization

### Styling
- Edit `TaskManagerCSS.html` to customize the web interface appearance
- Modify color schemes, fonts, and layout
- Add custom CSS classes for specific styling needs

### Functionality
- Extend `Code.gs` with additional functions
- Add new fields to the task structure
- Create custom automation rules

### Reporting
- Add new sheets for specialized reports
- Create custom dashboard charts
- Implement additional custom functions

## 📱 Web Interface Features

### Dashboard Cards
- **Total Tasks**: Shows total number of tasks
- **Completed**: Number of completed tasks
- **In Progress**: Tasks currently being worked on
- **Overdue**: Tasks past their due date

### Filtering & Search
- **Status Filter**: Filter by task status
- **Priority Filter**: Filter by priority level
- **Project Filter**: Filter by project (auto-populated)
- **Search**: Text search across all task fields

### Task Actions
- **👁️ View**: See detailed task information
- **✏️ Edit**: Modify task details
- **✅ Complete**: Mark task as completed
- **🔄 Reopen**: Reopen completed tasks

### Keyboard Shortcuts
- **Ctrl+N**: Create new task
- **Escape**: Close modals
- **Enter**: Submit forms

## 🔧 Troubleshooting

### Common Issues

#### "Permission denied" errors
- Ensure you've granted all required permissions
- Re-run the `setupTaskManager()` function if needed

#### Web app not loading
- Check that all HTML files are properly named and contain correct content
- Verify the deployment settings allow access
- Clear browser cache and try again

#### Email notifications not working
- Verify email address in Settings sheet
- Check that "Email Notifications" is set to "TRUE"
- Ensure Apps Script has Gmail permissions

#### Triggers not working
- Run `installTriggers()` function manually
- Check trigger permissions in Apps Script dashboard
- Verify trigger frequency settings

### Performance Tips

#### For Large Task Lists
- Use filters to limit displayed tasks
- Consider archiving completed tasks periodically
- Optimize custom functions for better performance

#### Sheet Performance
- Avoid complex formulas in frequently edited cells
- Use named ranges for better formula management
- Regular cleanup of unnecessary formatting

## 🔄 Updates & Maintenance

### Adding Sample Data
Run the `addSampleData()` function to populate the sheet with example tasks.

### Backup & Recovery
- Regularly backup your Google Sheets file
- Export task data as CSV for external backup
- Version control your Apps Script code

### Scaling Considerations
- For teams > 50 people, consider additional optimization
- Implement archiving for completed tasks
- Consider database integration for very large datasets

## 🤝 Contributing

### Reporting Issues
- Document steps to reproduce problems
- Include error messages and screenshots
- Specify browser and device information

### Feature Requests
- Describe the desired functionality
- Explain the use case and benefits
- Consider implementation complexity

### Code Contributions
- Follow existing code style and structure
- Test thoroughly before submitting
- Document new features and functions

## 📄 License

This project is provided as-is for educational and personal use. Feel free to modify and adapt for your needs.

## 🙏 Acknowledgments

Built with Google Apps Script, Google Sheets, and modern web technologies. Designed for productivity and ease of use.

---

**Need help?** Check the troubleshooting section or refer to the Google Apps Script documentation at [developers.google.com/apps-script](https://developers.google.com/apps-script).