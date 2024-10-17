import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import ToDoWidget from './ToDoWidget';
import * as api from '../../utils/API';

jest.mock('../../utils/API');

describe('ToDoWidget Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders todo items', async () => {
    const mockTodos = [
      { id: 1, task: 'Buy groceries' },
      { id: 2, task: 'Schedule meeting' },
    ];
    api.fetchToDoItems.mockResolvedValue(mockTodos);

    render(<ToDoWidget />);

    await waitFor(() => {
      expect(screen.getByText('Buy groceries')).toBeInTheDocument();
      expect(screen.getByText('Schedule meeting')).toBeInTheDocument();
    });
  });

  test('displays loading state', () => {
    api.fetchToDoItems.mockReturnValue(new Promise(() => {})); // Never resolves
    render(<ToDoWidget />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('displays error message on API failure', async () => {
    api.fetchToDoItems.mockRejectedValue(new Error('Failed to fetch todos'));
    render(<ToDoWidget />);

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch todos/i)).toBeInTheDocument();
    });
  });

  test('displays "No todos" message when there are no tasks', async () => {
    api.fetchToDoItems.mockResolvedValue([]);
    render(<ToDoWidget />);

    await waitFor(() => {
      expect(screen.getByText(/no todos/i)).toBeInTheDocument();
    });
  });
});
