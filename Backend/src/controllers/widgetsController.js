<<<<<<< HEAD
const express = require('express');
const Widget = require('../models/Widget');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newWidget = new Widget({
      ...req.body,
      user: req.user._id, // Assuming you have user authentication
    });
    await newWidget.save();
    res.status(201).json(newWidget);
  } catch (error) {
    console.error('Error creating widget:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const widgets = await Widget.find({ user: req.user._id });
    res.status(200).json(widgets);
  } catch (error) {
    console.error('Error retrieving widgets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const widget = await Widget.findById(req.params.id);
    if (!widget) {
      return res.status(404).json({ message: 'Widget not found' });
    }
    res.status(200).json(widget);
  } catch (error) {
    console.error('Error retrieving widget:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const widget = await Widget.findById(req.params.id);
    if (!widget) {
      return res.status(404).json({ message: 'Widget not found' });
    }

    // Check if the user owns the widget
    if (widget.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    widget.set(req.body);
    await widget.save();

    res.status(200).json(widget);
  } catch (error) {
    console.error('Error updating widget:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const widget = await Widget.findById(req.params.id);
    if (!widget) {
      return res.status(404).json({ message: 'Widget not found' });
    }

    // Check if the user owns the widget
    if (widget.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await widget.deleteOne();
    res.status(200).json({ message: 'Widget deleted successfully' });
  } catch (error) {
    console.error('Error deleting widget:', error);
    res.status(500).json({    message: 'Internal server error' });
  }
});

module.exports = router;
=======
const Widget = require('../models/Widget');

exports.createWidget = async (req, res) => {
  try {
    const newWidget = new Widget(req.body);
    await newWidget.save();
    res.status(201).json(newWidget);
  } catch (err) {
    res.status(500).json({ error: 'Error creating widget' });
  }
};

exports.getWidgets = async (req, res) => {
  try {
    const widgets = await Widget.find({ user: req.user._id });
    res.status(200).json(widgets);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching widgets' });
  }
};

exports.updateWidget = async (req, res) => {
  try {
    const updatedWidget = await Widget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedWidget);
  } catch (err) {
    res.status(500).json({ error: 'Error updating widget' });
  }
};

exports.deleteWidget = async (req, res) => {
  try {
    await Widget.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Widget deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting widget' });
  }
};
>>>>>>> fcbce0f9cc0a80414eeaa0c49fbf20d6d1f85c36
