const express = require('express');
const router = express.Router();

router.post('/send', (req, res, next) => {
  const data = req.body
  console.dir(data)
  res.send('ok')
});

module.exports = router;