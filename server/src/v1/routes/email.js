const express = require('express');
const router = express.Router();
const boom = require('boom')

const nodemailer = require('nodemailer')

const util = require('util')

router.post('/send', (req, res, next) => {
  const data = req.body
  
  const transporter = nodemailer.createTransport({
    host: 'mail.name.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PW
    }
  })

  const mailOption = {
    from: req.body.email,
    to: process.env.EMAIL_USER,
    text: req.body.message,
    subject: `Message from ${req.body.name}`
  }

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.error(error)
      next(boom.badImplementation(error))
    }
    else {
      res.send('Successfully sent')
    }
  })
});

module.exports = router;