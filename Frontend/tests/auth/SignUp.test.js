import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUp from './SignUp';
import { AuthContext } from '../contexts/AuthContext';
import * as api from '../utils/api';

jest.mock('../utils/api');

describe('SignUp Component', () => {
  const mockSignUp = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderSignUp = () => {
    return render(
      <MemoryRouter>
        <AuthContext.Provider value={{ signUp: mockSignUp }}>
          <SignUp />
        </AuthContext.Provider>
      </MemoryRouter>
    );
  };

  test('renders SignUp form', () => {
    renderSignUp();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  test('successful sign up calls signUp function', async () => {
    api.signUp.mockResolvedValue({ token: 'fake-token' });
    renderSignUp();

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(api.signUp).toHaveBeenCalledWith('newuser', 'newuser@example.com', 'password123');
      expect(mockSignUp).toHaveBeenCalledWith('fake-token');
    });
  });

  test('displays error message on sign up failure', async () => {
    api.signUp.mockRejectedValue(new Error('Sign up failed'));
    renderSignUp();

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/sign up failed/i)).toBeInTheDocument();
    });
  });

  test('validates form before submission', async () => {
    renderSignUp();

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });

    expect(api.signUp).not.toHaveBeenCalled();
  });
});
