const express = require('express');
const router = express.Router();

const axios = require('axios');

router.get('/@brianjleeofcl', (req, res, next) => {
  axios.get('https://medium.com/@brianjleeofcl?source=footer_card', {
    headers: {
      accept: 'text/html'
    }
  }).then(({data}) => {
    const noscript = data.replace(/<script.*?<\/script>/gm, '').replace(/<\/head>/, '<base target="_blank" /></head>')
    res.send(noscript)
  }).catch(err => {
    next(boom.badImplementation(err.message, err))
  });
});

module.exports = router;