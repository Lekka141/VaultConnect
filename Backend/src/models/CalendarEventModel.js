const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
  },
  color: {
    type: String,
  },
  allDay: {
    type: Boolean,
    default: false,
  },
  reminders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reminder', // Assuming you have a Reminder model
    },
  ],
});

const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);

module.exports = CalendarEvent;
