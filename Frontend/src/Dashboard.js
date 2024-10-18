import React, { useState, useEffect, Suspense } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import MainGrid from './components/MainGrid';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import { ErrorBoundary } from 'react-error-boundary';
import { get } from './utils/API';

/** Lazy load widgets */
const WeatherWidget = React.lazy(() => import('./components/Widgets/WeatherWidget'));
const CalendarWidget = React.lazy(() => import('./components/Widgets/CalendarWidget'));
const ToDoWidget = React.lazy(() => import('./components/Widgets/ToDoWidget'));
const FinancialNewsWidget = React.lazy(() => import('./components/Widgets/FinancialNewsWidget'));
const RSSFeedWidget = React.lazy(() => import('./components/Widgets/RSSFeedWidget'));
const NewsWidget = React.lazy(() => import('./components/Widgets/NewsWidget'));

/** Fallback component to display while widgets load */
const LoadingSpinner = () => (
  <Box textAlign="center" mt={4}>
    <CircularProgress />
    <Typography variant="h6" mt={2}>Loading Widget...</Typography>
  </Box>
);

/** Error Fallback Component for handling widget loading errors */
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <Box role="alert" p={2} bgcolor="#fdecea" borderRadius={4}>
    <Typography variant="h6" color="error">Something went wrong!</Typography>
    <Typography variant="body2" color="textSecondary">{error.message}</Typography>
    <Button variant="contained" color="primary" onClick={resetErrorBoundary} sx={{ mt: 2 }}>Try again</Button>
  </Box>
);

function Dashboard() {
  /** State to manage active widgets */
  const [activeWidgets, setActiveWidgets] = useState({
    WeatherWidget: true,
    CalendarWidget: true,
    ToDoWidget: true,
    FinancialNewsWidget: false,
    RSSFeedWidget: false,
    NewsWidget: false,
  });
  const [data, setData] = useState(null); /** State to hold fetched data */

  /** Fetch data when the component mounts. */
  useEffect(() => {
    get('/data-endpoint')
      .then(response => {
        setData(response);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  /** Function to toggle the visibility of widgets on the dashboard */
  const toggleWidget = (widgetName) => {
    setActiveWidgets(prevWidgets => ({
      ...prevWidgets,
      [widgetName]: !prevWidgets[widgetName],
    }));
  };

  return (
    <Box display="flex">
      <SideMenu selectedWidgets={activeWidgets} setSelectedWidgets={setActiveWidgets} /> {/* Sidebar with widget selection to toggle widgets */}
      <Box flex="1" ml={3}>
        <Header /> {/* Render the app header */}
        <MainGrid> {/* Main content area where widgets are displayed */}
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingSpinner />}>
              {activeWidgets.WeatherWidget && <WeatherWidget data={data?.weather} />}
              {activeWidgets.CalendarWidget && <CalendarWidget data={data?.calendar} />}
              {activeWidgets.ToDoWidget && <ToDoWidget data={data?.todos} />}
              {activeWidgets.FinancialNewsWidget && <FinancialNewsWidget />}
              {activeWidgets.RSSFeedWidget && <RSSFeedWidget />}
              {activeWidgets.NewsWidget && <NewsWidget />}
            </Suspense>
          </ErrorBoundary>
        </MainGrid>
      </Box>
    </Box>
  );
}

export default Dashboard;
