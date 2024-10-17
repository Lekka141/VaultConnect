import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignIn from './SignIn';
import { AuthContext } from '../contexts/AuthContext';
import * as api from '../utils/api';

jest.mock('../utils/api');

describe('SignIn Component', () => {
  const mockLogin = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderSignIn = () => {
    return render(
      <MemoryRouter>
        <AuthContext.Provider value={{ login: mockLogin }}>
          <SignIn />
        </AuthContext.Provider>
      </MemoryRouter>
    );
  };

  test('renders SignIn form', () => {
    renderSignIn();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('successful login redirects to dashboard', async () => {
    api.login.mockResolvedValue({ token: 'fake-token' });
    renderSignIn();

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(api.login).toHaveBeenCalledWith('user@example.com', 'password123');
      expect(mockLogin).toHaveBeenCalledWith('fake-token');
    });
  });

  test('displays error message on login failure', async () => {
    api.login.mockRejectedValue(new Error('Invalid credentials'));
    renderSignIn();

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  test('validates form before submission', async () => {
    renderSignIn();

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });

    expect(api.login).not.toHaveBeenCalled();
  });
});
