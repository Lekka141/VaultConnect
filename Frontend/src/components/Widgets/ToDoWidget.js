import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * ToDoWidget component for managing a to-do list.
 * Users can add tasks, mark them as completed, and delete tasks.
 * @returns {JSX.Element} - Rendered ToDoWidget component.
 */
function ToDoWidget() {
  /**
   * State to store the list of tasks.
   * Each task object has the properties 'text' and 'completed'.
   */
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  /**
   * Handle adding a new task to the list.
   * Checks if the new task is not empty before adding it.
   */
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask(''); /** Clear the input field after adding the task */
    }
  };

  /**
   * Handle toggling the completion status of a task.
   * Updates the 'completed' property of the specified task.
   *
   * @param {number} index - The index of the task to be toggled.
   */
  const handleToggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  /**
   * Handle deleting a task from the list.
   * Removes the task at the specified index.
   *
   * @param {number} index - The index of the task to be deleted.
   */
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          To-Do List
        </Typography>
        {/* Input field for adding a new task */}
        <TextField
          label="New Task"
          variant="outlined"
          size="small"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          sx={{ marginBottom: 2, width: '100%' }}
        />
        {/* Button to add a new task */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTask}
          sx={{ width: '100%' }}
        >
          Add Task
        </Button>

        {/* Display the list of tasks */}
        <List sx={{ marginTop: 2 }}>
          {tasks.map((task, index) => (
            <ListItem key={index} secondaryAction={
              <IconButton edge="end" onClick={() => handleDeleteTask(index)}>
                <DeleteIcon />
              </IconButton>
            }>
              {/* Checkbox to mark task as completed */}
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggleTask(index)}
              />
              <ListItemText
                primary={task.text}
                sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default ToDoWidget;
