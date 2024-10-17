import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

/** Set up the localizer for the Calendar using moment.js */
const localizer = momentLocalizer(moment);

/**
 * CalendarWidget component that allows users to add, edit, and delete events.
 * Uses local storage to persist events across sessions.
 * @returns {JSX.Element} - Rendered CalendarWidget component.
 */
function CalendarWidget() {
  /** State to manage events */
  const [events, setEvents] = useState([]); /** Stores the list of events */
  const [newEvent, setNewEvent] = useState({ title: '', start: new Date(), end: new Date(), category: '' }); /** Stores the current event details for adding/editing */
  const [open, setOpen] = useState(false); /** Controls the visibility of the event dialog */
  const [selectedEvent, setSelectedEvent] = useState(null); /** Holds the selected event for editing */

  /** Load events from localStorage when the component mounts */
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    setEvents(storedEvents);
  }, []);

  /** Save events to localStorage whenever they change */
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  /**
   * Opens the dialog for adding or editing an event.
   * @param {object} event - The event to be edited. If null, a new event is being added.
   */
  const handleClickOpen = (event = null) => {
    if (event) {
      /** Edit mode: populate the form with selected event data */
      setNewEvent({ ...event, start: new Date(event.start), end: new Date(event.end) });
      setSelectedEvent(event);
    } else {
      /** Create mode: reset the form */
      setNewEvent({ title: '', start: new Date(), end: new Date(), category: '' });
      setSelectedEvent(null);
    }
    setOpen(true);
  };

  /** Closes the event dialog */
  const handleClose = () => setOpen(false);

  /**
   * Handles adding or editing an event.
   * Updates the state with the new or modified event.
   */
  const handleSaveEvent = () => {
    if (selectedEvent) {
      /** Edit existing event */
      const updatedEvents = events.map((event) =>
        event === selectedEvent ? newEvent : event
      );
      setEvents(updatedEvents);
    } else {
      /** Add new event */
      setEvents([...events, newEvent]);
    }
    handleClose();
  };

  /**
   * Handles deleting an event.
   * Removes the selected event from the state.
   */
  const handleDeleteEvent = () => {
    setEvents(events.filter((event) => event !== selectedEvent));
    handleClose();
  };

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Calendar
        </Typography>

        {/* Calendar component from react-big-calendar */}
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable
          onSelectEvent={(event) => handleClickOpen(event)} /** Open dialog for editing */
          onSelectSlot={({ start, end }) => {
            setNewEvent({ title: '', start, end, category: '' });
            setSelectedEvent(null);
            setOpen(true); /** Open dialog for new event */
          }}
        />

        {/* Dialog for adding/editing events */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Event Title"
              type="text"
              fullWidth
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <TextField
              select
              label="Category"
              value={newEvent.category}
              onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
              fullWidth
              margin="normal"
            >
              <MenuItem value="work">Work</MenuItem>
              <MenuItem value="personal">Personal</MenuItem>
              <MenuItem value="appointment">Appointment</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            {selectedEvent && (
              <Button onClick={handleDeleteEvent} color="secondary">
                Delete
              </Button>
            )}
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSaveEvent} color="primary">
              {selectedEvent ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default CalendarWidget;
