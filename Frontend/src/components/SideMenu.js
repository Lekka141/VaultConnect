import React from 'react';
import { Box, Card, CardContent, Checkbox, FormControlLabel, Grid, Button, Typography } from '@mui/material';

/**
 * SideMenu component for selecting active widgets.
 * This component renders a list of checkboxes that users can select to toggle the display of widgets.
 *
 * @param {Object} selectedWidgets - The state that tracks which widgets are selected.
 * @param {Function} setSelectedWidgets - Function to update the selected widgets state.
 * @returns {JSX.Element} - The rendered side menu with checkboxes for widget selection.
 */
const SideMenu = ({ selectedWidgets, setSelectedWidgets }) => {
  /** List of widgets that can be toggled on/off */
  const widgetsList = [
    { name: 'weather', label: 'Weather Widget' },
    { name: 'news', label: 'News Widget' },
    { name: 'financialNews', label: 'Financial News Widget' },
    { name: 'calendar', label: 'Calendar Widget' },
    { name: 'rssFeed', label: 'RSS Feed Widget' },
    { name: 'toDo', label: 'To-Do Widget' },
  ];

  /**
   * Function to handle the change event for a checkbox.
   * This toggles the state of the selected widget.
   *
   * @param {string} widgetName - The name of the widget to toggle.
   */
  const handleWidgetChange = (widgetName) => {
    if (!selectedWidgets.hasOwnProperty(widgetName)) {
      console.error(`Invalid widget name: ${widgetName}`);
      return;
    }
    setSelectedWidgets((prevWidgets) => ({
      ...prevWidgets,
      [widgetName]: !prevWidgets[widgetName],
    }));
  };

  /**
   * Renders a list of checkboxes for selecting widgets.
   * Each checkbox corresponds to a widget that can be enabled or disabled.
   *
   * @returns {JSX.Element[]} - An array of FormControlLabel components for each widget.
   */
  const renderCheckboxes = () => {
    return widgetsList.map(({ name, label }) => (
      <Grid item xs={12} sm={6} md={4} key={name}>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedWidgets[name]}
              onChange={() => handleWidgetChange(name)}
              name={name}
              aria-label={`Select ${label}`}
            />
          }
          label={label}
        />
      </Grid>
    ));
  };

  return (
    <Box>
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Select Your Widgets
          </Typography>
          <Grid container spacing={1}>
            {renderCheckboxes()}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={() => console.log('Widgets updated:', selectedWidgets)}
          >
            Apply Selection
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

/**
 * Default props to prevent errors in case props are not provided.
 */
SideMenu.defaultProps = {
  selectedWidgets: {},
  setSelectedWidgets: () => {},
};

export default SideMenu;

/**
 * Additional Improvements:
 * - Added comments to explain the purpose of each component and function.
 * - Improved error handling for invalid widget names.
 * - Updated button to provide feedback when clicked, indicating widgets were updated.
 */
