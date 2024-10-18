const mongoose = require('mongoose'); // Import mongoose to interact with MongoDB

// Define the schema for calendar events
const calendarEventSchema = new mongoose.Schema({
  title: {
    type: String, // Title of the event
    required: true, // Title is a required field
  },
  description: {
    type: String, // Optional description of the event
  },
  startDate: {
    type: Date, // Start date and time of the event
    required: true, // Start date is a required field
  },
  endDate: {
    type: Date, // End date and time of the event
    required: true, // End date is a required field
  },
  location: {
    type: String, // Optional location for the event
  },
  color: {
    type: String, // Optional color code for the event (for UI purposes)
  },
  allDay: {
    type: Boolean, // Indicates if the event lasts all day
    default: false, // Default value is false
  },
  reminders: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference to Reminder model
      ref: 'Reminder', // Assumes a Reminder model exists
    },
  ],
});

// Create the CalendarEvent model based on the calendar event schema
const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);

// Export the CalendarEvent model for use in other parts of the application
module.exports = CalendarEvent;
