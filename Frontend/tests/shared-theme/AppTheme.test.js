import React from 'react';
import { render, screen } from '@testing-library/react';
import AppTheme from './AppTheme';

describe('AppTheme Component', () => {
  test('renders the theme wrapper', () => {
    render(<AppTheme><div>Test Theme</div></AppTheme>);

    expect(screen.getByText(/Test Theme/i)).toBeInTheDocument();
  });

  test('applies theme properties correctly', () => {
    const { container } = render(<AppTheme><div>Test Theme</div></AppTheme>);
    
    // Example test case assuming your theme adds specific classes
    const themeWrapper = container.firstChild;
    expect(themeWrapper).toHaveClass('MuiThemeProvider-root');
  });
});
