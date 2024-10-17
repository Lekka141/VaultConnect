import React from 'react';
import { Grid, Paper } from '@mui/material';

/**
 * MainGrid component responsible for rendering a responsive grid layout with widgets
 *
 * This component uses Material-UI's Grid system to create a flexible and responsive layout
 * for different widgets. Each widget is wrapped inside a Paper component for visual separation
 * and elevation, enhancing the overall user experience by making the interface feel more organized.
 *
 * @returns {JSX.Element} - The rendered grid layout containing widgets
 */
function MainGrid() {
  return (
    /**
     * Grid container serves as the main layout, providing a responsive structure for the widgets.
     * 'spacing' determines the space between each grid item, while 'padding' ensures the entire layout
     * is not cramped against the edges of the screen.
     */
    <Grid container spacing={2} sx={{ padding: { xs: 2, md: 4 }, backgroundColor: 'background.default' }}>
      {/**
       * Grid items are responsible for containing each individual widget.
       * 'xs', 'sm', and 'md' determine the width of the grid items at different screen sizes.
       * For example, 'xs={12}' means the item takes up the full width on extra-small screens,
       * while 'md={4}' makes it one-third of the width on medium screens.
       */}
      <Grid item xs={12} sm={6} md={4}>
        {/**
         * Paper component is used to provide an elevated, card-like container for each widget.
         * 'padding' is used to create inner spacing, ensuring the widget's content doesn't touch the edges.
         * The elevation prop gives the Paper a shadow effect, making the widget visually distinct.
         */}
        <Paper sx={{ padding: 3, elevation: 3, backgroundColor: 'background.paper' }}>
          {/* Placeholder for Widget 1 */}
          <Typography variant="h6" gutterBottom>Widget 1</Typography>
          <Typography variant="body2">This is a placeholder for Widget 1. Replace this with the actual widget component.</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ padding: 3, elevation: 3, backgroundColor: 'background.paper' }}>
          {/* Placeholder for Widget 2 */}
          <Typography variant="h6" gutterBottom>Widget 2</Typography>
          <Typography variant="body2">This is a placeholder for Widget 2. Replace this with the actual widget component.</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ padding: 3, elevation: 3, backgroundColor: 'background.paper' }}>
          {/* Placeholder for Widget 3 */}
          <Typography variant="h6" gutterBottom>Widget 3</Typography>
          <Typography variant="body2">This is a placeholder for Widget 3. Replace this with the actual widget component.</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MainGrid;
