import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import CalendarWidget from './CalendarWidget';
import * as api from '../../utils/API';

jest.mock('../../utils/API');

describe('CalendarWidget Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders calendar events', async () => {
    const mockEvents = [
      { id: 1, title: 'Meeting', date: '2023-04-15' },
      { id: 2, title: 'Lunch', date: '2023-04-16' },
    ];
    api.fetchCalendarEvents.mockResolvedValue(mockEvents);

    render(<CalendarWidget />);

    await waitFor(() => {
      expect(screen.getByText('Meeting')).toBeInTheDocument();
      expect(screen.getByText('Lunch')).toBeInTheDocument();
    });
  });

  test('displays loading state', () => {
    api.fetchCalendarEvents.mockReturnValue(new Promise(() => {})); // Never resolves
    render(<CalendarWidget />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('displays error message on API failure', async () => {
    api.fetchCalendarEvents.mockRejectedValue(new Error('Failed to fetch events'));
    render(<CalendarWidget />);

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch events/i)).toBeInTheDocument();
    });
  });

  test('displays "No events" message when calendar is empty', async () => {
    api.fetchCalendarEvents.mockResolvedValue([]);
    render(<CalendarWidget />);

    await waitFor(() => {
      expect(screen.getByText(/no events/i)).toBeInTheDocument();
    });
  });
});
