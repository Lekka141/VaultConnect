import { getCustomizations } from './customizations';

describe('Theme Customizations', () => {
  test('returns correct customizations', () => {
    const customizations = getCustomizations();
    
    expect(customizations).toHaveProperty('palette');
    expect(customizations).toHaveProperty('typography');
    
    expect(customizations.palette).toHaveProperty('primary');
    expect(customizations.palette.primary).toHaveProperty('main', '#1976d2');
    
    expect(customizations.typography).toHaveProperty('fontFamily');
    expect(customizations.typography.fontFamily).toContain('Roboto');
  });

  test('returns different customizations when dark mode is enabled', () => {
    const customizations = getCustomizations(true);
    
    expect(customizations.palette).toHaveProperty('mode', 'dark');
    expect(customizations.palette.primary).toHaveProperty('main', '#bb86fc');
  });
});
