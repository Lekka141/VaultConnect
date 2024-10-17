const { validationResult } = require('express-validator');
const User = require('../models/User');
const AppError = require('../utils/appError');

exports.getWidgets = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('widgets');
    res.json(user.widgets);
  } catch (error) {
    next(new AppError('Error fetching widgets', 500));
  }
};

exports.createWidget = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { widgetType, settings } = req.body;
    const user = await User.findById(req.user.id);
    
    const newWidgetId = Date.now().toString(); // Simple unique ID generation
    user.widgets[newWidgetId] = { widgetType, settings };
    
    await user.save();
    
    res.status(201).json({ id: newWidgetId, widgetType, settings });
  } catch (error) {
    next(new AppError('Error creating widget', 500));
  }
};

exports.updateWidget = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { settings } = req.body;
    
    const user = await User.findById(req.user.id);
    
    if (!user.widgets[id]) {
      return next(new AppError('Widget not found', 404));
    }
    
    user.widgets[id].settings = { ...user.widgets[id].settings, ...settings };
    await user.save();
    
    res.json(user.widgets[id]);
  } catch (error) {
    next(new AppError('Error updating widget', 500));
  }
};

exports.deleteWidget = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(req.user.id);
    
    if (!user.widgets[id]) {
      return next(new AppError('Widget not found', 404));
    }
    
    delete user.widgets[id];
    await user.save();
    
    res.status(204).end();
  } catch (error) {
    next(new AppError('Error deleting widget', 500));
  }
};
