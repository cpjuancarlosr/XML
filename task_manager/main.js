document.addEventListener('DOMContentLoaded', () => {
  refreshTasks();
  const form = document.getElementById('addForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    if (text) {
      google.script.run.withSuccessHandler(() => {
        input.value = '';
        refreshTasks();
      }).addTask(text);
    }
  });
});

function refreshTasks() {
  google.script.run.withSuccessHandler(renderTasks).getTasks();
}

function renderTasks(tasks) {
  const tbody = document.getElementById('tasksBody');
  tbody.innerHTML = '';
  tasks.forEach(t => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${t.task}</td>
      <td>${t.status}</td>
      <td>${formatDate(t.created)}</td>
      <td>${formatDate(t.completed)}</td>
      <td class="actions">
        <i class="material-icons green-text text-darken-2" title="Mark Done" onclick="markDone('${t.id}')">done</i>
        <i class="material-icons red-text text-darken-2" title="Delete" onclick="deleteTask('${t.id}')">delete</i>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function markDone(id) {
  google.script.run.withSuccessHandler(refreshTasks).updateTaskStatus(id, 'DONE');
}

function deleteTask(id) {
  if (confirm('Delete this task?')) {
    google.script.run.withSuccessHandler(refreshTasks).deleteTask(id);
  }
}

function formatDate(value) {
  if (!value) return '';
  const d = new Date(value);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
}