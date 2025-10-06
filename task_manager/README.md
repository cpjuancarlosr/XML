# Task Manager Google Apps Script + Sheets App

## Overview

Task Manager is a lightweight web application built with Google Apps Script and Google Sheets that lets you create, track, complete, and delete tasks directly inside your spreadsheet or as a standalone web app.

## Features

- Add new tasks with a simple form.
- Tasks stored in a dedicated `Tasks` sheet in the active spreadsheet.
- Mark tasks as DONE and automatically record completion time.
- Delete tasks.
- Access through custom spreadsheet menu or deployed web app URL.
- Modern UI powered by Materialize CSS.

## Setup Instructions

1. **Create a new Google Spreadsheet** (or open an existing one).
2. **Open the Script Editor** (`Extensions > Apps Script`).
3. **Replace** the default files with the contents of this repository:
   - `appsscript.json`
   - `Code.gs`
   - `index.html`
   - `main.js`
4. **Save** all files.
5. Back in the script editor, run `setup` once to create the `Tasks` sheet.
6. Go to `Deploy > Test deployments` or `Deploy > Manage deployments` to create a new deployment as a **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Click **Deploy** and authorize the required permissions.
8. Share the generated web app URL with your users or open the sidebar via the custom `Task Manager` menu in the spreadsheet.

## Local Development with clasp (Optional)

If you prefer working locally:

```bash
npm install -g @google/clasp
clasp login
clasp create --title "Task Manager" --type sheets --rootDir ./task_manager
clasp push
```

After pushing, proceed with the setup steps above.

## License

MIT