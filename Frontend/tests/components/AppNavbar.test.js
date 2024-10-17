import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import { AuthContext } from '../auth/AuthContext';

describe('AppNavbar Component', () => {
  const mockLogout = jest.fn();

  const renderNavbar = (isAuthenticated = true) => {
    return render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuthenticated, logout: mockLogout }}>
          <AppNavbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );
  };

  test('renders navigation links when authenticated', () => {
    renderNavbar();
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/settings/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test('does not render navigation links when not authenticated', () => {
    renderNavbar(false);
    expect(screen.queryByText(/dashboard/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/settings/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
  });

  test('calls logout function when logout button is clicked', () => {
    renderNavbar();
    fireEvent.click(screen.getByText(/logout/i));
    expect(mockLogout).toHaveBeenCalled();
  });
});
