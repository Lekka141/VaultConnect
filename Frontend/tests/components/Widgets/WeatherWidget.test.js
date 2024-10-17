import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import WeatherWidget from './WeatherWidget';
import * as api from '../../utils/API';

jest.mock('../../utils/API');

describe('WeatherWidget Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders weather information', async () => {
    const mockWeather = {
      temperature: '25°C',
      condition: 'Sunny',
    };
    api.fetchWeather.mockResolvedValue(mockWeather);

    render(<WeatherWidget />);

    await waitFor(() => {
      expect(screen.getByText(/25°C/i)).toBeInTheDocument();
      expect(screen.getByText(/Sunny/i)).toBeInTheDocument();
    });
  });

  test('displays loading state', () => {
    api.fetchWeather.mockReturnValue(new Promise(() => {})); // Never resolves
    render(<WeatherWidget />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('displays error message on API failure', async () => {
    api.fetchWeather.mockRejectedValue(new Error('Failed to fetch weather'));
    render(<WeatherWidget />);

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch weather/i)).toBeInTheDocument();
    });
  });

  test('displays "No weather data" message when no data is available', async () => {
    api.fetchWeather.mockResolvedValue(null);
    render(<WeatherWidget />);

    await waitFor(() => {
      expect(screen.getByText(/no weather data/i)).toBeInTheDocument();
    });
  });
});
