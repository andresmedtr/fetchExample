const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

let todos = [];

app.get('/', (req, res) => {
  res.send('Welcome to the TodoList API!');
});

app.get('/tasks', (req, res) => {
  res.json({ tasks: todos });
});

app.post('/tasks', (req, res) => {
  const { task } = req.body;
  todos.push({ id: todos.length + 1, text: task });
  res.json({ success: true, message: 'Task added successfully' });
});

app.delete('/tasks/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  todos = todos.filter((task) => task.id !== taskId);
  res.json({ success: true, message: 'Task deleted successfully' });
});

app.delete('/tasks', (req, res) => {
  todos = [];
  res.json({ success: true, message: 'All tasks deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
