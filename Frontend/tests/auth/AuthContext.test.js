import React from 'react';
import { render, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

describe('AuthContext', () => {
  test('provides auth state and methods', () => {
    const TestComponent = () => {
      const { isAuthenticated, login, logout } = useAuth();
      return (
        <div>
          <span data-testid="auth-status">{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</span>
          <button onClick={() => login('test-token')}>Login</button>
          <button onClick={logout}>Logout</button>
        </div>
      );
    };

    const { getByTestId, getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(getByTestId('auth-status')).toHaveTextContent('Not Authenticated');

    act(() => {
      getByText('Login').click();
    });

    expect(getByTestId('auth-status')).toHaveTextContent('Authenticated');

    act(() => {
      getByText('Logout').click();
    });

    expect(getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
  });
});
