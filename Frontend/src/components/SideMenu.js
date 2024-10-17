import React from 'react';
import { Box, Card, CardContent, Checkbox, FormControlLabel, Grid, Button, Typography } from '@mui/material';

const SideMenu = ({ selectedWidgets, setSelectedWidgets }) => {
  const widgetsList = [
    { name: 'weather', label: 'Weather Widget' },
    { name: 'news', label: 'News Widget' },
    { name: 'financialNews', label: 'Financial News Widget' },
    { name: 'calendar', label: 'Calendar Widget' },
    { name: 'rssFeed', label: 'RSS Feed Widget' },
    { name: 'toDo', label: 'To-Do Widget' },
  ];

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

  const renderCheckboxes = () => {
    return widgetsList.map(({ name, label }) => (
      <Grid item xs={12} sm={6} md={4} key={name}>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedWidgets[name]}
              onChange={() => handleWidgetChange(name)}
              name={name}
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

export default SideMenu;
