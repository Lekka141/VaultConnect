import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * ToDoWidget component allows users to create, view, and delete to-do items.
 *
 * @returns {JSX.Element} - The rendered to-do list widget
 */
const ToDoWidget = () => {
  /** State for managing the to-do items */
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  /** Load to-do items from localStorage on component mount */
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  /** Save to-do items to localStorage whenever the todos state changes */
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  /**
   * Handles the addition of a new to-do item
   * Adds the item to the to-do list if it's not empty
   */
  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo.trim()]);
      setNewTodo('');
    }
  };

  /**
   * Handles the deletion of a to-do item
   * @param {number} index - The index of the item to delete
   */
  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  /**
   * Handles key press events to add a new to-do when the Enter key is pressed
   * @param {object} event - The keyboard event object
   */
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          To-Do List
        </Typography>
        <TextField
          label="New To-Do"
          variant="outlined"
          fullWidth
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress} /** Add keypress handler for Enter key */
          sx={{ mb: 2 }}
          aria-label="New to-do input" /** Added aria-label for accessibility */
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTodo}
          disabled={newTodo.trim() === ''}
          aria-label="Add new to-do" /** Added aria-label for accessibility */
        >
          Add To-Do
        </Button>
        <List sx={{ mt: 2 }}>
          {todos.map((todo, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label={`Delete ${todo}`}
                  onClick={() => handleDeleteTodo(index)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={todo} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ToDoWidget;
