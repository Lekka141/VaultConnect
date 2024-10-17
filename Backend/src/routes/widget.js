const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../controllers/authController');
const { getWidgets, createWidget, updateWidget, deleteWidget } = require('../controllers/widgetController');

const router = express.Router();

router.use(protect);

router.get('/', getWidgets);
router.post('/', [
  body('widgetType').notEmpty().withMessage('Widget type is required'),
  body('settings').isObject().withMessage('Settings must be an object')
], createWidget);
router.put('/:id', [
  body('settings').isObject().withMessage('Settings must be an object')
], updateWidget);
router.delete('/:id', deleteWidget);

module.exports = router;
