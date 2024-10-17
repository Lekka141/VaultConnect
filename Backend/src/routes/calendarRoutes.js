const express = require('express');
const CalendarEvent = require('../models/CalendarEventModel');
const { authMiddleware } = require('../middleware/AuthMiddleware'); // Ensure correct import

const router = express.Router();

router.post('/', authMiddleware, async (req,    res) => {
  try {
    const newEvent = new CalendarEvent({
      ...req.body,
      user: req.user._id, // Assuming you have user authentication
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const events = await CalendarEvent.find({ user: req.user._id });
    res.status(200).json(events);
  } catch (error) {
    console.error('Error retrieving events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const event = await CalendarEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error('Error retrieving event:', error);
    res.status(500).json({ message: 'Internal server error'    });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const event = await CalendarEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the user owns the event
    if (event.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    event.set(req.body);
    await event.save();

    res.status(200).json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const event = await CalendarEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the user owns the event
    if (event.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await event.deleteOne();
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Internal server error'    });
  }
});

module.exports = router;
