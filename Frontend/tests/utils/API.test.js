import * as api from './API';

const LOGIN_ENDPOINT = '/api/login';
const CALENDAR_EVENTS_ENDPOINT = '/api/calendar-events';

describe('API utility functions', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('login function sends correct request and returns token', async () => {
    const mockResponse = { token: 'fake-token' };
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await api.login('user@example.com', 'password123');

    expect(global.fetch).toHaveBeenCalledWith(LOGIN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user@example.com', password: 'password123' }),
    });
    expect(result).toEqual(mockResponse);
  });

  test('fetchCalendarEvents returns events data', async () => {
    const mockEvents = [{ id: 1, title: 'Event 1' }, { id: 2, title: 'Event 2' }];
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockEvents),
    });

    const result = await api.fetchCalendarEvents();

    expect(global.fetch).toHaveBeenCalledWith(CALENDAR_EVENTS_ENDPOINT, {
      headers: { 'Authorization': 'Bearer undefined' }, // Assuming no token is set in this test
    });
    expect(result).toEqual(mockEvents);
  });

  test('API calls handle network errors', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));

    await expect(api.login('user@example.com', 'password123')).rejects.toThrow('Network error');
    await expect(api.fetchCalendarEvents()).rejects.toThrow('Network error');
  });

  test('API calls handle non-OK responses', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
    });

    await expect(api.login('user@example.com', 'password123')).rejects.toThrow('HTTP error! status: 401');
    await expect(api.fetchCalendarEvents()).rejects.toThrow('HTTP error! status: 401');
  });
});
