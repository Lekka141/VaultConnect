import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext'; // Import only AuthProvider
import ProtectedRoute from './ProtectedRoute';
import { ErrorBoundary } from 'react-error-boundary';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Dashboard = lazy(() => import('./Dashboard'));
const SignUp = lazy(() => import('./components/auth/SignUpComponent'));
const SignIn = lazy(() => import('./components/auth/SignIn'));
const WeatherWidget = lazy(() => import('./components/Widgets/WeatherWidget'));
const CalendarWidget = lazy(() => import('./components/Widgets/CalendarWidget'));
const ToDoWidget = lazy(() => import('./components/Widgets/ToDoWidget'));
const FinancialNewsWidget = lazy(() => import('./components/Widgets/FinancialNewsWidget'));
const NewsWidget = lazy(() => import('./components/Widgets/NewsWidget'));
const RSSFeedWidget = lazy(() => import('./components/Widgets/RSSFeedWidget'));
const Header = lazy(() => import('./components/Header'));

/**
 * LoadingSpinner component provides visual feedback while components are being loaded.
 * This ensures a better user experience during lazy loading of components.
 *
 * @returns {JSX.Element} - The loading spinner component
 */
const LoadingSpinner = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

/**
 * ErrorFallback component provides a user-friendly message when an error occurs.
 * This helps improve user experience by giving context when something goes wrong.
 *
 * @param {object} props - Props passed to the error fallback component
 * @returns {JSX.Element} - The error fallback UI
 */
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <Box role="alert" sx={{ textAlign: 'center', padding: 4 }}>
    <Typography variant="h4" color="error" gutterBottom>
      Oops! Something went wrong.
    </Typography>
    <Typography variant="body1" gutterBottom>
      {error.message}
    </Typography>
    <Button variant="contained" color="primary" onClick={resetErrorBoundary}>
      Try again
    </Button>
  </Box>
);

function App() {
  return (
    <AuthProvider> {/* Wrapping the entire app with AuthProvider */}
      <Router>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <Dashboard /> {/* No SideMenu */}
                    </>
                  </ProtectedRoute>
                }
              >
                <Route path="weather" element={<WeatherWidget />} />
                <Route path="calendar" element={<CalendarWidget />} />
                <Route path="todo" element={<ToDoWidget />} />
                <Route path="financial-news" element={<FinancialNewsWidget />} />
                <Route path="news" element={<NewsWidget />} />
                <Route path="rss-feed" element={<RSSFeedWidget />} />
              </Route>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Navigate to="/dashboard" />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;
