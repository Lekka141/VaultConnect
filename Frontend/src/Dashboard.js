import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Box, Grid, CircularProgress, Typography } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import WidgetSelector from './components/WidgetSelector'; // Import the WidgetSelector
import { get } from './utils/API';

// Lazy load widgets
const WeatherWidget = lazy(() => import('./components/Widgets/WeatherWidget'));
const CalendarWidget = lazy(() => import('./components/Widgets/CalendarWidget'));
const ToDoWidget = lazy(() => import('./components/Widgets/ToDoWidget'));
const FinancialNewsWidget = lazy(() => import('./components/Widgets/FinancialNewsWidget'));
const NewsWidget = lazy(() => import('./components/Widgets/NewsWidget'));
const RSSFeedWidget = lazy(() => import('./components/Widgets/RSSFeedWidget'));

const LoadingSpinner = () => (
  <Box textAlign="center" mt={4}>
    <CircularProgress />
    <Typography variant="h6" mt={2}>Loading Widget...</Typography>
  </Box>
);

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <Box role="alert" p={2} bgcolor="#fdecea" borderRadius={4}>
    <Typography variant="h6" color="error">Something went wrong!</Typography>
    <Typography variant="body2" color="text.secondary">{error.message}</Typography>
    <Button variant="contained" color="primary" onClick={resetErrorBoundary}>Try again</Button>
  </Box>
);

function Dashboard() {
  const [activeWidgets, setActiveWidgets] = useState({
    WeatherWidget: false,
    CalendarWidget: false,
    ToDoWidget: false,
    FinancialNewsWidget: false,
    RSSFeedWidget: false,
    NewsWidget: false,
  });
  const [data, setData] = useState(null);

  useEffect(() => {
    get('/data-endpoint')
      .then(response => {
        setData(response);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Box display="flex" flexDirection="column" flex="1" ml={3}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingSpinner />}>
          <WidgetSelector selectedWidgets={activeWidgets} setSelectedWidgets={setActiveWidgets} />
          <Box mt={3}>
            <Grid container spacing={2}> {/* Use Grid container for layout */}
              {activeWidgets.WeatherWidget && (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <WeatherWidget data={data?.weather} />
                </Grid>
              )}
              {activeWidgets.CalendarWidget && (
                <Grid item xs={12} sm={6} md={6} lg={6}> {/* Increased size for CalendarWidget */}
                  <CalendarWidget data={data?.calendar} />
                </Grid>
              )}
              {activeWidgets.ToDoWidget && (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <ToDoWidget data={data?.todos} />
                </Grid>
              )}
              {activeWidgets.FinancialNewsWidget && (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <FinancialNewsWidget />
                </Grid>
              )}
              {activeWidgets.RSSFeedWidget && (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <RSSFeedWidget />
                </Grid>
              )}
              {activeWidgets.NewsWidget && (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <NewsWidget />
                </Grid>
              )}
            </Grid>
          </Box>
        </Suspense>
      </ErrorBoundary>
    </Box>
  );
}

export default Dashboard;