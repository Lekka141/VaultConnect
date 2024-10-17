const express = require('express');
const Widget = require('../models/Widget');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newWidget = new Widget(req.body);
    await newWidget.save();
    res.status(201).json(newWidget);
  } catch (error) {
    console.error('Error creating widget:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const widgets = await Widget.find();
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
    const widget = await Widget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!widget) {
      return res.status(404).json({ message: 'Widget not found' });
    }
    res.status(200).json(widget);
  } catch (error) {
    console.error('Error updating widget:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const widget = await Widget.findByIdAndDelete(req.params.id);
    if (!widget) {
      return res.status(404).json({ message: 'Widget not found' });
    }
    res.status(200).json({ message: 'Widget deleted successfully' });
  } catch (error) {
    console.error('Error deleting widget:', error);
    res.status(500).json({    message: 'Internal server error' });
  }
});

module.exports = router;
