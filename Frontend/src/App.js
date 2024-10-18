import React, { Suspense, lazy, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './components/auth/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import { ErrorBoundary } from 'react-error-boundary';

/* Lazy load components for better performance, reducing initial bundle size.
   This is particularly helpful for optimizing the loading experience. */
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
const SideMenu = lazy(() => import('./components/SideMenu'));

/* Fallback component for lazy loading.
   Displays a loading indicator while the components are being loaded to improve user experience. */
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

/* Error Fallback Component for handling runtime errors gracefully.
   This improves resilience by providing the user with feedback and recovery options when an error occurs. */
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert" className="error-fallback">
    <h2>Oops! Something went wrong.</h2>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    /* Wrap the entire application with AuthProvider to manage authentication state globally.
       This ensures that authentication context is available throughout the app. */
    <AuthProvider>
      <Router>
        {/* ErrorBoundary wraps the application to catch any runtime errors.
            If an error occurs, the user will see the ErrorFallback component.
            onReset is configured to reload the window to attempt recovery from the error. */}
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
          {/* Suspense is used to handle the lazy loading of components, providing a fallback UI (LoadingSpinner)
              while the components are being loaded. This improves user experience by displaying a loading indicator. */}
          <Suspense fallback={<LoadingSpinner />}>
            {/* Conditionally render Header and SideMenu based on authentication status */}
            {isLoggedIn ? (
              <>
                <Header />
                <SideMenu />
              </>
            ) : null}
            {/* Define routes using <Routes> and <Route> components.
                Routes handle the navigation within the application. */}
            <Routes>
              {/* Route for the sign-up page. This allows new users to create an account. */}
              <Route path="/signup" element={<SignUp />} />
              {/* Route for the sign-in page. This allows existing users to log in. */}
              <Route path="/signin" element={<SignIn />} />
              {/* ProtectedRoute ensures that only authenticated users can access the dashboard and its widgets.
                  The dashboard route contains nested routes for different widgets. */}
              <Route
                path="/dashboard"
                element={
                  isLoggedIn ? (
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  ) : (
                    <Navigate to="/signin" />
                  )
                }
              >
                {/* Nested routes for different widgets within the dashboard.
                    These routes are protected, meaning the user must be authenticated to access them. */}
                <Route path="weather" element={<WeatherWidget />} />
                <Route path="calendar" element={<CalendarWidget />} />
                <Route path="todo" element={<ToDoWidget />} />
                <Route path="financial-news" element={<FinancialNewsWidget />} />
                <Route path="news" element={<NewsWidget />} />
                <Route path="rss-feed" element={<RSSFeedWidget />} />
              </Route>
              {/* Default route to the dashboard, wrapped in ProtectedRoute to ensure authentication. */}
              <Route
                path="/"
                element={
                  isLoggedIn ? (
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  ) : (
                    <Navigate to="/signin" />
                  )
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