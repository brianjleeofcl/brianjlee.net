const express = require('express');
const router = express.Router();

router.post('/send', (req, res, next) => {
  const data = JSON.parse(req.body)
  console.dir(data)
  res.set('Access-Control-Allow-Origin', '*')
  res.send('ok')
});

module.exports = router;