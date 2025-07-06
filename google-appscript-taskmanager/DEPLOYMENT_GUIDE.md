# 🚀 Deployment Guide - Google Apps Script Task Manager

This guide provides detailed, step-by-step instructions for deploying the Task Manager application.

## 📋 Prerequisites

Before you begin, ensure you have:
- A Google account
- Access to Google Sheets and Google Apps Script
- Basic familiarity with Google Workspace tools

## 🎯 Step 1: Create the Google Sheets Spreadsheet

### 1.1 Create New Spreadsheet
1. Navigate to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create a new spreadsheet
3. Rename the spreadsheet:
   - Click on **"Untitled spreadsheet"** at the top
   - Enter **"Task Manager"** or your preferred name
   - Press **Enter** to save

### 1.2 Initial Spreadsheet Setup
At this point, your spreadsheet will have one default sheet. We'll set up the proper structure using Apps Script.

## 🛠️ Step 2: Set Up Google Apps Script

### 2.1 Open Apps Script Editor
1. In your Google Sheets document, click **Extensions** in the menu bar
2. Select **Apps Script** from the dropdown
3. This opens the Google Apps Script editor in a new tab

### 2.2 Prepare the Apps Script Project
1. You'll see a default project with a file called `Code.gs`
2. Delete the existing code in `Code.gs` (the default `myFunction()`)
3. The editor should now show an empty `Code.gs` file

## 📝 Step 3: Add the Main Apps Script Code

### 3.1 Copy the Main Code
1. Open the `Code.gs` file from this project
2. Copy all the contents (Ctrl+A, then Ctrl+C)
3. Paste it into the Apps Script editor (Ctrl+V)
4. Save the project (Ctrl+S)

### 3.2 Rename the Project (Optional)
1. Click on **"Untitled project"** at the top of the Apps Script editor
2. Enter **"Task Manager"** or your preferred name
3. Press **Enter** to save

## 🎨 Step 4: Add HTML Files for Web Interface

### 4.1 Create TaskManagerUI.html
1. In the Apps Script editor, click the **"+"** button next to **"Files"**
2. Select **"HTML"** from the dropdown
3. Name the file **exactly**: `TaskManagerUI`
4. Delete any default content
5. Copy and paste the contents from `TaskManagerUI.html`
6. Save (Ctrl+S)

### 4.2 Create TaskManagerCSS.html
1. Click the **"+"** button again
2. Select **"HTML"**
3. Name the file **exactly**: `TaskManagerCSS`
4. Copy and paste the contents from `TaskManagerCSS.html`
5. Save (Ctrl+S)

### 4.3 Create TaskManagerJS.html
1. Click the **"+"** button again
2. Select **"HTML"**
3. Name the file **exactly**: `TaskManagerJS`
4. Copy and paste the contents from `TaskManagerJS.html`
5. Save (Ctrl+S)

**Important**: The HTML file names must be exact (case-sensitive) as they're referenced in the code.

## ⚙️ Step 5: Run Initial Setup

### 5.1 Grant Permissions
1. In the Apps Script editor, ensure `Code.gs` is selected
2. In the function dropdown (next to the play button), select `setupTaskManager`
3. Click the **"Run"** button (▶️)
4. You'll be prompted to authorize the script:
   - Click **"Review permissions"**
   - Choose your Google account
   - Click **"Advanced"** (if shown)
   - Click **"Go to Task Manager (unsafe)"** (if shown)
   - Click **"Allow"**

### 5.2 Verify Setup
1. After the script runs, return to your Google Sheets tab
2. You should see four new sheets created:
   - **Tasks**: Main task data
   - **Projects**: Project information
   - **Dashboard**: Summary and reports
   - **Settings**: Configuration options
3. You should see a popup alert: **"Task Manager setup complete!"**

## 📧 Step 6: Configure Email Notifications (Optional)

### 6.1 Update Settings
1. Go to the **"Settings"** sheet in your spreadsheet
2. In row 5, column B, replace `your-email@example.com` with your actual email address
3. Ensure **"Email Notifications"** is set to **"TRUE"** in row 4, column B if you want notifications

### 6.2 Test Email Permissions
The email functionality will request permissions when first used. You can test this by creating a task later.

## 🌐 Step 7: Deploy Web Application (Optional)

### 7.1 Create Deployment
1. In the Apps Script editor, click **"Deploy"** → **"New deployment"**
2. Click the gear icon ⚙️ next to **"Select type"**
3. Choose **"Web app"**
4. Configure deployment settings:
   - **Description**: "Task Manager Web App" (optional)
   - **Execute as**: "Me (your-email@gmail.com)"
   - **Who has access**: Choose based on your needs:
     - **"Only myself"**: Only you can access
     - **"Anyone with Google account"**: Anyone with a Google account
     - **"Anyone"**: Public access (not recommended)

### 7.2 Deploy and Get URL
1. Click **"Deploy"**
2. Copy the **"Web app URL"** provided
3. Click **"Done"**
4. Test the web app by opening the URL in a new browser tab

### 7.3 Web App Permissions
When you first access the web app:
1. You may see a security warning
2. Click **"Advanced"**
3. Click **"Go to Task Manager (unsafe)"**
4. The web app should load successfully

## 🧪 Step 8: Test the Application

### 8.1 Add Sample Data
1. In the Apps Script editor, select the `addSampleData` function
2. Click **"Run"** to add sample tasks
3. Return to your Google Sheets to see the sample data

### 8.2 Test Web Interface (if deployed)
1. Open your web app URL
2. Try creating a new task
3. Test filtering and searching features
4. Verify task status updates work

### 8.3 Test Email Notifications (if configured)
1. Create a task with a due date
2. Wait a few minutes for email notification
3. Check your email for the notification

## 🔧 Step 9: Troubleshooting Common Issues

### Issue: "Permission denied" errors
**Solution**:
- Re-run the `setupTaskManager` function
- Ensure all permissions are granted
- Check that you're the owner of the spreadsheet

### Issue: Web app shows "Script function not found"
**Solution**:
- Verify all HTML files are named correctly
- Check that `doGet` function exists in `Code.gs`
- Redeploy the web app

### Issue: Email notifications not working
**Solution**:
- Verify email address in Settings sheet
- Check that "Email Notifications" is set to "TRUE"
- Test Gmail permissions by manually running a notification function

### Issue: Triggers not working
**Solution**:
- Run `installTriggers()` function manually
- Check Apps Script trigger dashboard
- Verify trigger permissions

## 🔄 Step 10: Updating and Maintenance

### 10.1 Making Code Changes
1. Edit code in the Apps Script editor
2. Save changes (Ctrl+S)
3. For web app changes, create a new deployment:
   - **Deploy** → **Manage deployments**
   - Click **"New deployment"** or update existing
   - Use **"New version"** for updates

### 10.2 Backup Your Work
1. **Apps Script**: Download as ZIP file
   - In Apps Script editor: **File** → **Download as ZIP**
2. **Spreadsheet**: Download as Excel or make a copy
   - In Google Sheets: **File** → **Download** or **File** → **Make a copy**

### 10.3 Sharing with Team Members
1. **Spreadsheet**: Share via Google Sheets sharing settings
2. **Web App**: Ensure deployment settings allow team access
3. **Permissions**: Team members may need to authorize the app

## 📊 Step 11: Customization Options

### 11.1 Modify Task Fields
1. Update the `CONFIG` object in `Code.gs`
2. Modify the `setupTasksSheet()` function
3. Update the web interface HTML accordingly

### 11.2 Change Styling
1. Edit `TaskManagerCSS.html` for visual changes
2. Modify colors, fonts, and layout
3. Add custom CSS classes as needed

### 11.3 Add Custom Functions
1. Add new functions to `Code.gs`
2. Update the web interface if needed
3. Test thoroughly before deploying

## ✅ Deployment Checklist

Before considering your deployment complete, verify:

- [ ] Google Sheets spreadsheet created and named
- [ ] Apps Script project set up with all four files
- [ ] Initial setup function (`setupTaskManager`) executed successfully
- [ ] All four sheets created (Tasks, Projects, Dashboard, Settings)
- [ ] Email settings configured (if using notifications)
- [ ] Web app deployed (if using web interface)
- [ ] Sample data added and tested
- [ ] Basic functionality tested (create, update, complete tasks)
- [ ] Triggers installed and working
- [ ] Backup created

## 🎉 You're Done!

Congratulations! Your Google Apps Script Task Manager is now deployed and ready to use. 

### Next Steps:
1. Start creating real tasks for your projects
2. Invite team members if this is a collaborative project
3. Explore the reporting features in the Dashboard sheet
4. Customize the system to fit your specific needs

### Need Help?
- Refer to the main README.md for detailed usage instructions
- Check the troubleshooting section for common issues
- Visit the Google Apps Script documentation for advanced customization

---

**Happy task managing!** 🚀