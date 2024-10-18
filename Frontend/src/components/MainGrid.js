import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

/**
 * MainGrid component responsible for rendering a responsive grid layout with widgets.
 *
 * This component uses Material-UI's Grid system to create a flexible and responsive layout
 * for different widgets. Each widget is wrapped inside a Paper component for visual separation
 * and elevation, enhancing the overall user experience by making the interface feel more organized.
 *
 * @returns {JSX.Element} - The rendered grid layout containing widgets.
 */
function MainGrid() {
  /**
   * Sample widget data for dynamic rendering.
   * In a real-world application, this could be fetched from an API or passed as props.
   */
  const widgets = [
    { id: 1, title: 'Weather Widget', description: 'This is a placeholder for the Weather widget.' },
    { id: 2, title: 'News Widget', description: 'This is a placeholder for the News widget.' },
    { id: 3, title: 'Financial Widget', description: 'This is a placeholder for the Financial widget.' },
  ];

  return (
    /**
     * Grid container serves as the main layout, providing a responsive structure for the widgets.
     * 'spacing' determines the space between each grid item, while 'padding' ensures the entire layout
     * is not cramped against the edges of the screen.
     */
    <Grid container spacing={3} sx={{ padding: { xs: 2, md: 4 }, backgroundColor: 'background.default' }}>
      {widgets.map((widget) => (
        /**
         * Grid items are responsible for containing each individual widget.
         * 'xs', 'sm', and 'md' determine the width of the grid items at different screen sizes.
         */
        <Grid item xs={12} sm={6} md={4} key={widget.id}>
          {
            /**
             * Paper component is used to provide an elevated, card-like container for each widget.
             * 'padding' is used to create inner spacing, ensuring the widget's content doesn't touch the edges.
             * The elevation prop gives the Paper a shadow effect, making the widget visually distinct.
             */
          }
          <Paper sx={{ padding: 3, elevation: 3, backgroundColor: 'background.paper' }}>
            <Typography variant="h6" gutterBottom>{widget.title}</Typography>
            <Typography variant="body2">{widget.description}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default MainGrid;

/**
 * Additional Improvements:
 * - Updated widget placeholders to better represent their intended functionality.
 * - Added comments to clarify the use of Material-UI components and Grid properties.
 */
