import React, { useState, useMemo, useEffect } from 'react';
import { Box, Card, CardContent, Checkbox, FormControlLabel, Grid, Button, Typography } from '@mui/material';
import WeatherWidget from './Widgets/WeatherWidget';
import NewsWidget from './Widgets/NewsWidget';
import FinancialNewsWidget from './Widgets/FinancialNewsWidget';
import CalendarWidget from './Widgets/CalendarWidget';
import RSSFeedWidget from './Widgets/RSSFeedWidget';
import ToDoWidget from './Widgets/ToDoWidget';

/**
 * WidgetSelector component allows users to select and display various widgets on the dashboard.
 * @returns {JSX.Element} - The rendered widget selector with checkboxes and selected widgets
 */
const WidgetSelector = () => {
    /**
     * State to manage which widgets are selected
     * @type {Object} - Keys represent widget names, and values represent whether they are selected
     */
    const [selectedWidgets, setSelectedWidgets] = useState({
        weather: false,
        news: false,
        financialNews: false,
        calendar: false,
        rssFeed: false,
        toDo: false,
    });

    /**
     * Effect to load selected widgets from localStorage on component mount
     */
    useEffect(() => {
        const savedWidgets = localStorage.getItem('selectedWidgets');
        if (savedWidgets) {
            setSelectedWidgets(JSON.parse(savedWidgets)); /** Load saved selection from localStorage */
        }
    }, []);

    /**
     * List of available widgets for dynamic rendering
     * Each object contains the name, label, and component to render
     */
    const widgetsList = [
        { name: 'weather', label: 'Weather Widget', component: <WeatherWidget /> },
        { name: 'news', label: 'News Widget', component: <NewsWidget /> },
        { name: 'financialNews', label: 'Financial News Widget', component: <FinancialNewsWidget /> },
        { name: 'calendar', label: 'Calendar Widget', component: <CalendarWidget /> },
        { name: 'rssFeed', label: 'RSS Feed Widget', component: <RSSFeedWidget /> },
        { name: 'toDo', label: 'To-Do Widget', component: <ToDoWidget /> },
    ];

    /**
     * Function to handle checkbox changes for selecting widgets
     * @param {string} widgetName - The name of the widget to toggle its selected state
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
     * Helper function to render checkboxes for each widget dynamically
     * @returns {JSX.Element[]} - Array of FormControlLabel components with checkboxes
     */
    const renderCheckboxes = () => {
        return widgetsList.map(({ name, label }) => (
            <FormControlLabel
                key={name}
                control={
                    <Checkbox
                        checked={selectedWidgets[name]}
                        onChange={() => handleWidgetChange(name)}
                        name={name}
                        aria-label={`Select ${label}`} /** Add aria-label for accessibility */
                    />
                }
                label={label}
            />
        ));
    };

    /**
     * Memoized rendering of selected widgets to optimize performance
     * Only the selected widgets are rendered in the dashboard
     */
    const renderedWidgets = useMemo(() => {
        return (
            <Grid container spacing={2}>
                {widgetsList.map(({ name, component }) =>
                    selectedWidgets[name] && (
                        <Grid item xs={12} sm={6} md={4} key={name}>
                            {component}
                        </Grid>
                    )
                )}
            </Grid>
        );
    }, [selectedWidgets, widgetsList]);

    /**
     * Handles Apply Selection button click to save the selected widgets
     */
    const handleApplySelection = () => {
        localStorage.setItem('selectedWidgets', JSON.stringify(selectedWidgets)); /** Persist the selected widgets state in localStorage */
        console.log('Selected widgets saved:', selectedWidgets); /** Logs selected widgets for development purposes */
    };

    return (
        <Box>
            <Card sx={{ marginBottom: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Select Your Widgets
                    </Typography>
                    {/** Render checkboxes dynamically */}
                    {renderCheckboxes()}
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                        onClick={handleApplySelection} /** Calls handleApplySelection function to apply selected widgets */
                    >
                        Apply Selection
                    </Button>
                </CardContent>
            </Card>

            {/** Render selected widgets */}
            {renderedWidgets}
        </Box>
    );
};

export default WidgetSelector;
