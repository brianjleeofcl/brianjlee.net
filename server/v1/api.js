const express = require('express');
const router = express.Router();

const boom = require('boom');

router.use('/medium', require('./routes/medium'));
router.use('/projects', require('./routes/projects'));
router.use('/email', require('./routes/email'));

router.use((req, res, next) => {
  next(boom.notFound());
});

module.exports = router;
